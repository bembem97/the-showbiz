import { fetcher, isApiError } from "@/lib/fetcher";
import {
  API_KEY,
  API_URL,
  getPrettyDate,
  getImagePath,
  getNumberCompact,
  convertToCurrency,
  getReadableTime,
} from "@/lib/utils";
import {
  AggregateCastProps,
  AggregateCrewProps,
} from "@/types/aggregrate-credits";
import { CountryRatingProps } from "@/types/content-ratings";
import { CastMemberProps, CrewMemberProps } from "@/types/credits";
import { VideoProps } from "@/types/media-gallery";
import { CountryReleaseDatesProps } from "@/types/release-dates";
import { MovieDetailsProps, TvDetailsProps } from "@/types/title-details";
import {
  MovieMainInfoProps,
  EpisodeProps,
  SeasonProps,
  TvShowMainInfoProps,
} from "./title-detail-types";
import { getTitleTrailer } from "../media/func";

interface TvProps extends TvDetailsProps {
  aggregate_credits: {
    cast: AggregateCastProps[];
    crew: AggregateCrewProps[];
  };
  content_ratings: {
    results: CountryRatingProps[];
  };
  videos: {
    results: VideoProps[];
  };
}

interface MovieProps extends MovieDetailsProps {
  release_dates: {
    results: CountryReleaseDatesProps[];
  };
  credits: {
    cast: CastMemberProps[];
    crew: CrewMemberProps[];
  };
  videos: {
    results: VideoProps[];
  };
}

// todo: Get Tv Show Details
export async function getTvShowDetails(paramId: string) {
  const response = await fetcher<TvProps>(
    `${API_URL}tv/${paramId}?language=en-US&api_key=${API_KEY}&append_to_response=content_ratings,aggregate_credits,videos`,
  );

  if (isApiError(response)) return response;

  const {
    aggregate_credits,
    backdrop_path,
    content_ratings,
    created_by,
    first_air_date,
    genres,
    id,
    name,
    networks,
    last_episode_to_air: last_ep,
    next_episode_to_air: next_ep,
    number_of_episodes: ep_num,
    number_of_seasons: season_num,
    origin_country,
    original_language,
    overview,
    poster_path,
    production_companies,
    production_countries,
    seasons,
    spoken_languages,
    status,
    tagline,
    type,
    videos,
    vote_average,
    vote_count,
  } = response;

  const LATEST_SEASON_YEAR =
    getPrettyDate(
      seasons
        .filter(({ name }) => name.toLowerCase() !== "specials")
        .filter(({ air_date }) => air_date !== null)
        .find(({ season_number }, _, arr) => season_number === arr.length)
        ?.air_date,
      { style: "year" },
    ) || "unknown";
  const SEASON_YEAR_RELEASE = getPrettyDate(first_air_date, { style: "year" });

  const lEp: null | EpisodeProps =
    last_ep === null
      ? null
      : {
          air_date: getPrettyDate(last_ep.air_date, {}) || "",
          episode_number: last_ep.episode_number,
          // id: last_ep.id,
          name: last_ep.name,
          overview: last_ep.overview,
          runtime: getReadableTime(last_ep.runtime),
          season_number: last_ep.season_number,
          vote_average: Number(last_ep.vote_average.toFixed(1)),
          vote_count: getNumberCompact(last_ep.vote_count),
        };
  const nEp: null | EpisodeProps =
    next_ep === null
      ? null
      : {
          air_date: getPrettyDate(next_ep.air_date, {}) || "",
          episode_number: next_ep.episode_number,
          // id: next_ep.id,
          name: next_ep.name,
          overview: next_ep.overview,
          runtime: getReadableTime(next_ep.runtime),
          season_number: next_ep.season_number,
          vote_average: Number(next_ep.vote_average.toFixed(1)),
          vote_count: getNumberCompact(next_ep.vote_count),
        };
  const seasonInfo: SeasonProps[] = seasons
    .filter(({ name }) => name.toLowerCase() !== "specials")
    .map(
      ({
        air_date,
        episode_count,
        id,
        name,
        overview,
        season_number,
        vote_average,
      }) => ({
        air_date: getPrettyDate(air_date, {}),
        episode_count,
        name,
        id,
        overview,
        season_number,
        vote_average,
      }),
    );

  const mainInfo: TvShowMainInfoProps = {
    backdrop_path: getImagePath(backdrop_path, "backdrop"),
    certification: content_ratings.results.find((prop) => {
      if (prop.iso_3166_1 === "PH") return prop.iso_3166_1;
      if (prop.iso_3166_1 === "US") return prop.iso_3166_1;

      return prop.iso_3166_1 === origin_country[0]
        ? prop.iso_3166_1
        : undefined;
    })?.rating,
    date: getPrettyDate(first_air_date, { style: "long" }),
    directors: created_by.map(({ id, name, profile_path }) => ({
      id,
      name,
      profile_path: getImagePath(profile_path, "avatar"),
    })),
    stars: aggregate_credits.cast
      .sort((a, b) => a.order - b.order)
      .slice(0, 3)
      .map(({ id, name }) => ({ id, name })),
    id,
    last_episode: lEp,
    next_episode: nEp,
    genres,
    networks: networks.map(({ id, logo_path, name }) => ({
      id,
      logo_path: getImagePath(logo_path) as string,
      name,
    })),
    original_language,
    production_companies: production_companies.map(
      ({ logo_path, ...props }) => ({
        ...props,
        logo_path: getImagePath(logo_path),
      }),
    ),
    production_countries,
    total_episodes: ep_num > 1 ? `${ep_num} Episodes` : `${ep_num} Episode`,
    total_seasons:
      season_num > 1 ? `${season_num} Seasons` : `${season_num} Season`,
    overview,
    poster_path: getImagePath(poster_path, "poster"),
    seasons: seasonInfo,
    spoken_languages,
    status,
    tagline,
    title: name,
    trailer: getTitleTrailer(videos.results),
    type,
    vote_average: Number(vote_average.toFixed(1)),
    vote_count: getNumberCompact(vote_count),
    season_range:
      SEASON_YEAR_RELEASE === LATEST_SEASON_YEAR
        ? SEASON_YEAR_RELEASE
        : `${SEASON_YEAR_RELEASE}${"–" + LATEST_SEASON_YEAR}`,
    pathname: poster_path,
  };

  return mainInfo;
}

// todo: Get Movie Details
export async function getMovieDetails(paramId: string) {
  const response = await fetcher<MovieProps>(
    `${API_URL}movie/${paramId}?language=en-US&api_key=${API_KEY}&append_to_response=release_dates,credits,videos`,
  );

  if (isApiError(response)) return response;

  const {
    backdrop_path,
    budget,
    genres,
    id,
    origin_country,
    original_language,
    overview,
    poster_path,
    production_companies,
    production_countries,
    revenue,
    release_date,
    runtime,
    status,
    spoken_languages,
    title,
    tagline,
    videos,
    vote_average,
    vote_count,
    release_dates,
    credits,
  } = response;

  const mainInfo: MovieMainInfoProps = {
    backdrop_path: getImagePath(backdrop_path, "backdrop"),
    budget: budget ? convertToCurrency(budget) : "—",
    certification: release_dates.results
      .find((prop) => {
        if (prop.iso_3166_1 === "PH") return prop.iso_3166_1;

        return prop.iso_3166_1 === origin_country[0]
          ? prop.iso_3166_1
          : undefined;
      })
      ?.release_dates.find((prop) => prop.certification)?.certification,
    directors: credits.crew
      .filter(({ department }) => department.toLowerCase() === "directing")
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3)
      .map(({ id, name }) => ({
        id,
        name,
      })),
    stars: credits.cast
      .sort((a, b) => a.order - b.order)
      .slice(0, 3)
      .map(({ id, name }) => ({ id, name })),
    genres,
    id,
    original_language,
    overview,
    poster_path: getImagePath(poster_path),
    production_companies: production_companies.map(
      ({ logo_path, ...props }) => ({
        ...props,
        logo_path: getImagePath(logo_path, "default"),
      }),
    ),
    production_countries,
    revenue: revenue ? convertToCurrency(revenue) : "—",
    date: getPrettyDate(release_date, { style: "long" }),
    runtime: runtime ? getReadableTime(runtime) : null,
    status,
    spoken_languages,
    tagline,
    title,
    trailer: getTitleTrailer(videos.results),
    vote_average: Number(vote_average.toFixed(1)),
    vote_count: getNumberCompact(vote_count),
    pathname: poster_path,
  };

  return mainInfo;
}
