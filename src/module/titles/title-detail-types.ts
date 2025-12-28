import { GenreProps } from "@/types/genres";
import {
  ProductionCountryProps,
  SpokenLanguageProps,
} from "@/types/title-details";

type MainInfoProps = {
  backdrop_path: string;
  certification: string | undefined;
  directors: { id: number; name: string }[];
  stars: { id: number; name: string }[];
  genres: GenreProps[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  production_companies: {
    logo_path: string;
    id: number;
    name: string;
    origin_country: string;
  }[];
  production_countries: ProductionCountryProps[];
  date: string | null;
  status: string;
  spoken_languages: SpokenLanguageProps[];
  tagline: string;
  title: string;
  trailer: {
    id: string;
    key: string;
    name: string;
  };
  vote_average: number;
  vote_count: string;
  pathname: string | null;
};

type EpisodeProps = {
  // id: number;
  name: string;
  vote_average: number;
  overview: string;
  air_date: string;
  episode_number: number;
  runtime: string;
  season_number: number;
  vote_count: string;
};

type SeasonProps = {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  season_number: number;
  vote_average: number;
};

type MovieMainInfoProps = MainInfoProps & {
  budget: string;
  revenue: string;
  runtime: string | null;
};

interface TvShowMainInfoProps extends MainInfoProps {
  last_episode: EpisodeProps | null;
  next_episode: EpisodeProps | null;
  networks: {
    id: number;
    logo_path: string;
    name: string;
  }[];
  seasons: SeasonProps[];
  total_seasons: string;
  total_episodes: string;
  type: string;
  season_range: string;
}

// todo: Metadata Props
type MetadataProps =
  | Pick<
      MovieMainInfoProps,
      | "budget"
      | "date"
      | "id"
      | "original_language"
      | "production_companies"
      | "production_countries"
      | "revenue"
      | "spoken_languages"
      | "status"
    >
  | Pick<
      TvShowMainInfoProps,
      | "networks"
      | "type"
      | "total_episodes"
      | "total_seasons"
      | "date"
      | "id"
      | "original_language"
      | "production_companies"
      | "production_countries"
      | "spoken_languages"
      | "status"
    >;

type HeroHeaderProps = (
  | Pick<
      MovieMainInfoProps,
      | "backdrop_path"
      | "certification"
      | "date"
      | "directors"
      | "genres"
      | "id"
      | "overview"
      | "poster_path"
      | "runtime"
      | "stars"
      | "tagline"
      | "title"
      | "vote_average"
      | "vote_count"
      | "pathname"
    >
  | Pick<
      TvShowMainInfoProps,
      | "season_range"
      | "backdrop_path"
      | "certification"
      | "date"
      | "directors"
      | "genres"
      | "id"
      | "overview"
      | "poster_path"
      | "stars"
      | "tagline"
      | "title"
      | "vote_average"
      | "vote_count"
      | "pathname"
    >
) & {
  trailer: {
    id: string;
    key: string;
    name: string;
  };
};

export type {
  MovieMainInfoProps,
  TvShowMainInfoProps,
  EpisodeProps,
  SeasonProps,
  MetadataProps,
  HeroHeaderProps,
};
