import { getImagePath, getPrettyDate } from "@/lib/utils";
import { MovieMediaProps, TvMediaProps } from "@/types/media-titles";
import { MovieProps, TvShowProps } from "@/types/titles";
import { StarProps as ApiStarProps } from "@/types/stars";

export interface PosterProps {
  id: number;
  media_type: "movie" | "tv";
  poster_path: string;
  title: string;
  rating: string | number;
  year: string | null;
}

export interface StarProps {
  id: number;
  name: string;
  profile_path: string;
  known_for_department: string | null | undefined;
}

type Props = MovieProps | TvShowProps | MovieMediaProps | TvMediaProps;

export function posterProperties(data: Props): PosterProps {
  const { id, vote_average, poster_path } = data;
  const title = "title" in data ? data.title : data.name;
  const date =
    "release_date" in data
      ? getPrettyDate(data.release_date, { style: "year" })
      : getPrettyDate(data.first_air_date, { style: "year" });

  const result: PosterProps = {
    id,
    media_type:
      "media_type" in data && data.media_type === "movie" ? "movie" : "tv",
    poster_path: getImagePath(poster_path),
    title,
    rating: Number(vote_average.toFixed(1)) || "n/a",
    year: date ? date : null,
  };

  return result;
}

export function starProfile(props: ApiStarProps): StarProps {
  const { id, name, profile_path, known_for_department } = props;

  const result = {
    id,
    name,
    profile_path: getImagePath(profile_path),
    known_for_department,
  };

  return result;
}
