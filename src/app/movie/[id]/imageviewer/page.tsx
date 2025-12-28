import React from "react";
import { getAllMediaImage } from "@/module/titles/title-media-api";
import { getMetadataMovie } from "@/module/media/func";
import { TitlePhotos } from "@/module/media/component";

export async function generateMetadata({
  params,
}: PageProps<"/movie/[id]/imageviewer">) {
  const { id } = await params;
  const title = await getMetadataMovie(id);

  return { title };
}

export default async function ImageViewer({
  params,
}: PageProps<"/movie/[id]/imageviewer">) {
  const { id } = await params;
  const response = await getAllMediaImage(id, "movie");

  return <TitlePhotos data={response} />;
}
