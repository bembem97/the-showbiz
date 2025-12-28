import { ApiErrorProps, fetcher, isApiError } from "@/lib/fetcher";
import { posterProperties, PosterProps } from "../poster/func";
import {
  SimilarMovieApiResponse,
  SimilarTvShowApiResponse,
} from "@/types/title-similar";
import { API_KEY, API_URL } from "@/lib/utils";

export async function getSimilarTitles(
  id: number,
  media: "movie" | "tv",
): Promise<PosterProps[] | ApiErrorProps> {
  const response = await fetcher<
    SimilarMovieApiResponse | SimilarTvShowApiResponse
  >(
    `${API_URL}${media}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (isApiError(response)) return response;

  const data = response.results.map((value) =>
    posterProperties({ ...value, media_type: media }),
  );

  return data;
}
