import { ApiErrorProps, fetcher, isApiError } from "@/lib/fetcher";
import {
  API_KEY,
  API_URL,
  getImagePath,
  getPrettyDate,
  getVoteAverage,
} from "@/lib/utils";
import { VideosApiResponse } from "@/types/media-gallery";
import {
  MovieMediaApiResponse,
  TvMediaApiResponse,
} from "@/types/media-titles";
import { getTitleTrailer } from "../media/func";

export interface HeroProps {
  backdrop_path: string;
  id: number;
  media_type: "movie" | "tv";
  vote_average: number | null;
  release_date: string | null;
  title: string;
  priority: boolean;
  loading: "eager" | "lazy";
  trailer: null | { id: string; key: string; name: string };
}

export default async function getHero() {
  try {
    const apiMovie = fetch(
      `${API_URL}trending/movie/week?language=en-US&api_key=${API_KEY}`,
    );
    const apiTv = fetch(
      `${API_URL}trending/tv/week?language=en-US&api_key=${API_KEY}`,
    );

    const [movieProm, tvProm] = await Promise.all([apiMovie, apiTv]);

    if (!movieProm.ok || !tvProm.ok) {
      const movieError = await movieProm.json();
      const tvError = await tvProm.json();

      let error: ApiErrorProps = {
        status_code: 0,
        status_message: "",
      };

      if (isApiError(movieError)) {
        error = {
          status_message: movieError.status_message,
          status_code: "Code " + movieError.status_code,
        };
      } else if (isApiError(tvError)) {
        error = {
          status_message: tvError.status_message,
          status_code: "Code " + tvError.status_code,
        };
      }

      return error;
    }

    const [movie, tv] = await Promise.all([movieProm.json(), tvProm.json()]);
    const { results: movieResult } = movie as MovieMediaApiResponse;
    const { results: tvResult } = tv as TvMediaApiResponse;

    const titles: Promise<HeroProps[]> = Promise.all(
      [...movieResult, ...tvResult]
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 6)
        .map(async (prop, index) => {
          const { backdrop_path, id, media_type, vote_average } = prop;
          const video = await fetcher<VideosApiResponse>(
            `${API_URL}${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`,
          );

          if ("name" in prop) {
            const { first_air_date, name } = prop;
            return {
              backdrop_path: getImagePath(backdrop_path),
              id,
              media_type,
              vote_average: getVoteAverage(vote_average),
              release_date: getPrettyDate(first_air_date, { style: "long" }),
              title: name,
              priority: index === 0 ? true : false,
              loading: index === 0 ? "eager" : "lazy",
              trailer: isApiError(video)
                ? null
                : getTitleTrailer(video.results),
            };
          }

          const { release_date, title } = prop;
          return {
            backdrop_path: getImagePath(backdrop_path),
            id,
            media_type,
            vote_average: getVoteAverage(vote_average),
            release_date: getPrettyDate(release_date, { style: "long" }),
            title,
            priority: index === 0 ? true : false,
            loading: index === 0 ? "eager" : "lazy",
            trailer: isApiError(video) ? null : getTitleTrailer(video.results),
          };
        }),
    );

    return titles;
  } catch (err) {
    console.error("Pahibalo! ", err);
    return { status_code: "", status_message: err } as ApiErrorProps;
  }
}
