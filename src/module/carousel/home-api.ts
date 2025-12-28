import { fetcher, isApiError } from "@/lib/fetcher";
import { API_KEY, API_URL } from "@/lib/utils";
import { MovieApiResponse, TvShowApiResponse } from "@/types/titles";
import { posterProperties, starProfile } from "../poster/func";
import { StarApiResponse } from "@/types/stars";

export async function getPopularMovies() {
  const response = await fetcher<MovieApiResponse>(
    `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "movie" }),
  );
}

export async function getPopularShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "tv" }),
  );
}

export async function getUpcomingMovies() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "movie" }),
  );
}

export async function getUpcomingShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "tv" }),
  );
}

export async function getOnlyNetflixShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=PH&with_watch_providers=8&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "tv" }),
  );
}

export async function getPopularStars() {
  const response = await fetcher<StarApiResponse>(
    `${API_URL}person/popular?language=en-US&page=1&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) => starProfile(value));
}
