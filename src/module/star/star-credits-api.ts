import { CombinedCreditsApiResponse } from "@/types/combined-credits";
import starCreditProperties from "./star-credits-function";
import { ApiErrorProps, isApiError } from "@/lib/fetcher";
import { API_KEY, API_URL } from "@/lib/utils";

export default async function getStarCredits(id: string, known_for: string) {
  const response: CombinedCreditsApiResponse | ApiErrorProps = await fetch(
    `${API_URL}person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`,
  ).then((res) => res.json());

  if (isApiError(response)) return response;
  const credits = starCreditProperties(response, known_for);

  return credits;
}
