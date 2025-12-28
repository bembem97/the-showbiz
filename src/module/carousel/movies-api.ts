import { fetcher, isApiError } from "@/lib/fetcher";
import { API_KEY, API_URL } from "@/lib/utils";
import { MovieApiResponse } from "@/types/titles";
import { posterProperties } from "../poster/func";

export async function getActionMovies() {
  const response = await fetcher<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28&without_genres=16&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "movie" }),
  );
}

export async function getAnimatedAdventureMovies() {
  const response = await fetcher<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12,16&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "movie" }),
  );
}

export async function getComedyMovies() {
  const response = await fetcher<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "movie" }),
  );
}

export async function getFamilyMovies() {
  const response = await fetcher<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10751&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "movie" }),
  );
}

export async function getFantasyMovies() {
  const response = await fetcher<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=14&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "movie" }),
  );
}

export async function getHorrorMovies() {
  const response = await fetcher<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "movie" }),
  );
}

export async function getMysteryMovies() {
  const response = await fetcher<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "movie" }),
  );
}

export async function getSciFiMovies() {
  const response = await fetcher<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=878&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "movie" }),
  );
}

export async function getThrillerMovies() {
  const response = await fetcher<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "movie" }),
  );
}

export async function getWesternMovies() {
  const response = await fetcher<MovieApiResponse>(
    `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=37&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) =>
    posterProperties({ ...value, media_type: "movie" }),
  );
}
