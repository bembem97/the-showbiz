import { fetcher, isApiError } from "@/lib/fetcher";
import knownForFilter from "./known-for-function";
import { KnownForProps } from "./star-detail-types";
import { CombinedCreditsApiResponse } from "@/types/combined-credits";
import { API_KEY, API_URL } from "@/lib/utils";

export default async function getKnownFor(id: string) {
  const response = await fetcher<CombinedCreditsApiResponse>(
    `${API_URL}person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`,
  );

  if (isApiError(response)) return response;

  const known_for: KnownForProps[] = knownForFilter([
    ...response.cast,
    ...response.crew,
  ]).slice(0, 4);

  return known_for;
}
