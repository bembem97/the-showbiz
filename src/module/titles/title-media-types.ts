import { ImageProps, VideoProps } from "@/types/media-gallery";
import { MovieDetailsProps, TvDetailsProps } from "@/types/title-details";
import { Route } from "next";

export type AlphaMediaImageProps = {
  file_path: string;
  pathname: string;
  aspect: string;
  vote_average: number;
  vote_count: number;
};

export type MediaImageProps = Pick<
  AlphaMediaImageProps,
  "aspect" | "pathname"
> & {
  url: Route;
};

export type MediaVideoProps = Pick<VideoProps, "name" | "id"> & {
  pathname: string;
  url: Route;
};

// todo: Media Api Types
export type TitleDetailsProps = (MovieDetailsProps | TvDetailsProps) & {
  images: {
    backdrops: ImageProps[];
    posters: ImageProps[];
    logos: ImageProps[];
  };
};

export type TitleDetailVideoProps = (MovieDetailsProps | TvDetailsProps) & {
  videos: { results: VideoProps[] };
};
