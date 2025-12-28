import { ApiErrorProps, fetcher, isApiError } from "@/lib/fetcher";
import {
  ImageProps,
  ImagesApiResponse,
  VideosApiResponse,
} from "@/types/media-gallery";
import {
  AlphaMediaImageProps,
  MediaImageProps,
  MediaVideoProps,
  TitleDetailsProps,
  TitleDetailVideoProps,
} from "./title-media-types";
import { API_KEY, API_URL, getImagePath } from "@/lib/utils";
import { Route } from "next";

// todo: Media Video
export async function getMediaVideo(
  id: string,
  media: "movie" | "tv",
): Promise<MediaVideoProps[] | ApiErrorProps> {
  const response = await fetcher<VideosApiResponse>(
    `${API_URL}${media}/${id}/videos?api_key=${API_KEY}&language=en-US`,
  );

  if (isApiError(response)) return response;

  const paramId = id;
  const data: MediaVideoProps[] = response.results
    .map(({ id, key, name }) => ({
      id,
      name,
      pathname: `https://i.ytimg.com/vi/${key}/hqdefault.jpg`,
      url: `/${media}/${paramId}/video/${key}` as Route,
    }))
    .slice(0, 6);

  return data;
}

// todo: Get All Media Video
export async function getAllMediaVideo(
  id: string,
  media: "movie" | "tv",
): Promise<
  | {
      info: {
        title: string;
        returnUrl: string;
        background: string;
      };
      videos: MediaVideoProps[];
    }
  | ApiErrorProps
> {
  const response = await fetcher<TitleDetailVideoProps>(
    `${API_URL}${media}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
  );
  const paramId = id;

  if (isApiError(response)) return response;

  const { videos, backdrop_path } = response;

  const title = "title" in response ? response.title : response.name;

  const data = videos.results.map(({ id, key, name }) => ({
    id,
    name,
    pathname: `https://i.ytimg.com/vi/${key}/hqdefault.jpg`,
    url: `/${media}/${paramId}/video/${key}` as Route,
  }));

  return {
    info: {
      title,
      returnUrl: `/${media}/${id}`,
      background: getImagePath(backdrop_path, "backdrop"),
    },
    videos: data,
  };
}

// todo: Media Image
export async function getMediaImage(
  id: string,
  media: "movie" | "tv",
): Promise<MediaImageProps[] | ApiErrorProps> {
  const response = await fetcher<ImagesApiResponse>(
    `${API_URL}${media}/${id}/images?api_key=${API_KEY}&include_image_language=en-US%2Cnull&language=en`,
  );

  if (isApiError(response)) return response;

  const backdrops = mapData(
    response.backdrops.sort(sortData).slice(0, 3),
    "backdrop",
  );
  const posters = mapData(
    response.posters.sort(sortData).slice(0, 3),
    "poster",
  );

  const medias: MediaImageProps[] = [...backdrops, ...posters]
    .sort(sortData)
    .map(({ aspect, file_path, pathname }) => ({
      aspect,
      pathname,
      url: `/${media}/${id}/imageviewer${file_path}` as Route,
    }));

  return medias;
}

// todo: Get all media image
export async function getAllMediaImage(id: string, media: "movie" | "tv") {
  const response = await fetcher<TitleDetailsProps>(
    `${API_URL}${media}/${id}?api_key=${API_KEY}&append_to_response=images&include_image_language=en-US%2Cnull&language=en`,
  );

  if (isApiError(response)) return response;

  const { images, backdrop_path } = response;

  const title = "title" in response ? response.title : response.name;

  const backdrops = mapData(images.backdrops.sort(sortData), "backdrop");
  const posters = mapData(images.posters.sort(sortData), "poster");

  const medias: MediaImageProps[] = [...backdrops, ...posters]
    .sort(sortData)
    .map(({ aspect, file_path, pathname }) => ({
      aspect,
      pathname,
      url: `/${media}/${id}/imageviewer${file_path}` as Route,
    }));

  // console.log({ medias });

  return {
    info: {
      title,
      returnUrl: `/${media}/${id}`,
      background: getImagePath(backdrop_path, "backdrop"),
    },
    medias: medias.slice(0, 20),
  };
}

function sortData(
  a: ImageProps | AlphaMediaImageProps,
  b: ImageProps | AlphaMediaImageProps,
) {
  const scoreComparison = b.vote_average - a.vote_average;
  return scoreComparison !== 0 ? scoreComparison : b.vote_count - a.vote_count;
}

function mapData(data: ImageProps[], type: "backdrop" | "poster") {
  return data.map(({ file_path, vote_average, vote_count }) => ({
    pathname: getImagePath(file_path, type) as string,
    file_path,
    aspect: type === "backdrop" ? "aspect-4/3" : "aspect-2/3",
    vote_average,
    vote_count,
  }));
}
