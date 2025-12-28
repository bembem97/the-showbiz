import { StaticImageData } from "next/image";

export interface StarDetailsProps {
  biography: string;
  birthday: string | null;
  deathday: string | null;
  id: number;
  known_for: string;
  name: string;
  place_of_birth: string;
  profile_path: string | StaticImageData;
  pathname: string;
}

export type KnownForProps = Omit<StarCreditProps, "vote_average" | "year">;

export interface StarCreditProps {
  character?: string;
  id: number;
  media_type: "tv" | "movie";
  poster_path: string | StaticImageData;
  title: string;
  job?: string[];
  vote_average: number;
  year: number;
}
