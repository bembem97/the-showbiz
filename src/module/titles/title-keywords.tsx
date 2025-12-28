import AlertError from "@/components/ui/alert";
import { fetcher, isApiError } from "@/lib/fetcher";
import { API_KEY, API_URL } from "@/lib/utils";
import {
  MovieKeywordsApiResponse,
  TvKeywordsApiResponse,
} from "@/types/keywords";
import Chip from "@mui/material/Chip";

export async function getTitleKeywords(id: number, media_type: "movie" | "tv") {
  const response = await fetcher<
    MovieKeywordsApiResponse | TvKeywordsApiResponse
  >(`${API_URL}${media_type}/${id}/keywords?api_key=${API_KEY}`);

  if (isApiError(response)) return response;

  if ("keywords" in response) return response.keywords;

  return response.results;
}

export async function Keywords({
  id,
  media_type,
}: {
  id: number;
  media_type: "movie" | "tv";
}) {
  const data = await getTitleKeywords(id, media_type);

  if (isApiError(data)) {
    return (
      <AlertError error={data.status_code} message={data.status_message} />
    );
  }

  if (data.length < 1) {
    return <span className="text-white">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {data.map(({ id, name }) => (
        <Chip label={name} key={id} />
      ))}
    </div>
  );
}
