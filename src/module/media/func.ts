import { isApiError } from "@/lib/fetcher";
import { VideoProps } from "@/types/media-gallery";
import { getMovieDetails, getTvShowDetails } from "../titles/title-details-api";

export async function getMetadataMovie(id: string) {
  const data = await getMovieDetails(id);

  if (isApiError(data)) return { title: "Something went wrong." };

  const { title, date } = data;
  const year = date ? new Date(date).getFullYear() : null;

  return `${title}${year && ` (${year})`}`;
}

export async function getMetadataTvShow(id: string) {
  const data = await getTvShowDetails(id);

  if (isApiError(data)) return { title: "Something went wrong." };

  const { title, date } = data;
  const year = date ? new Date(date).getFullYear() : null;

  return `${title}${year && ` (${year})`}`;
}

export function getTitleTrailer(data: VideoProps[]) {
  return data
    .filter(({ official, type }) => {
      if (!official) return false;
      if (type === "Trailer") return true;
      if (type === "Teaser") return true;
      if (type === "Clip") return true;
    })
    .sort((a, b) => {
      const typeCompare = b.type.localeCompare(a.type);
      if (typeCompare !== 0) return typeCompare;

      return (
        Number(new Date(b.published_at)) - Number(new Date(a.published_at))
      );
    })
    .slice(0, 1)
    .map(({ id, key, name }) => ({ id, key, name }))[0];
}
