import { fetcher } from "@/lib/fetcher";
import { isApiError } from "@/lib/fetcher";
import { API_KEY, API_URL, getImagePath, getPrettyDate } from "@/lib/utils";
import { StarDetailsApiResponse } from "@/types/star-details";

export default async function getStarDetails(paramId: string) {
  const response = await fetcher<StarDetailsApiResponse>(
    `${API_URL}person/${paramId}?language=en-US&api_key=${API_KEY}`,
  );

  if (isApiError(response)) return response;

  const {
    biography,
    birthday,
    deathday,
    id,
    known_for_department,
    name,
    place_of_birth,
    profile_path,
  } = response;

  const starProfile = {
    biography,
    birthday: getPrettyDate(birthday, { style: "long" }),
    deathday: getPrettyDate(deathday, { style: "long" }),
    id,
    known_for: known_for_department,
    name,
    place_of_birth,
    profile_path: getImagePath(profile_path),
    pathname: profile_path,
  };

  return starProfile;
}
