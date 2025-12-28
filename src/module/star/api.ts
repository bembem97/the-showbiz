import { fetcher, isApiError } from "@/lib/fetcher";
import { API_KEY, API_URL, getImagePath } from "@/lib/utils";
import { StarApiResponse } from "@/types/stars";

export default async function getStars(page: number) {
  const res = await fetcher<StarApiResponse>(
    `${API_URL}person/popular?api_key=${API_KEY}&language=en-US&page=${page || 1}`,
    {
      next: { revalidate: 86400 },
    },
  );

  if (isApiError(res)) {
    return res;
  }

  const { results, total_pages } = res;

  const data = results.map(
    ({ id, name, profile_path, known_for_department }) => ({
      id,
      known_for_department,
      name,
      profile_path: getImagePath(profile_path),
    }),
  );

  // const maxResult = total_results > 10_000 ? 10_000 : total_results;
  const maxPage = total_pages > 500 ? 500 : total_pages;

  return {
    results: data,
    page: res.page,
    // total_result: maxResult,
    total_pages: maxPage,
  };
}
