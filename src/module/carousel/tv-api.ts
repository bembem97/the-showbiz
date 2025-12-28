import { fetcher, isApiError } from "@/lib/fetcher";
import { API_KEY, API_URL } from "@/lib/utils";
import { TvShowApiResponse } from "@/types/titles";
import { posterProperties } from "../poster/func";

export async function getActionAndAdventureShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10759&without_genres=16|18|35&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) => posterProperties(value));
}

export async function getAnimatedShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) => posterProperties(value));
}

export async function getComedyShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35&without_genres=16|18&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) => posterProperties(value));
}

export async function getCrimeShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=80&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) => posterProperties(value));
}

export async function getDocumentaryShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=99,10768,80&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) => posterProperties(value));
}

export async function getDramaShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=18&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) => posterProperties(value));
}

export async function getKidsAndFamilyShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16,10762&without_keywords=210024&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) => posterProperties(value));
}

export async function getMysteryShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) => posterProperties(value));
}

export async function getRealityShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&first_air_date.gte=2010-01-01&with_genres=10764&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) => posterProperties(value));
}

export async function getSciFiAndFantasyShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10765&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) => posterProperties(value));
}

export async function getTalkShows() {
  const response = await fetcher<TvShowApiResponse>(
    `${API_URL}discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10767&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  return response.results.map((value) => posterProperties(value));
}
