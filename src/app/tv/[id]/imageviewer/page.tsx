import React from "react";
import { getAllMediaImage } from "@/module/titles/title-media-api";
import { getMetadataTvShow } from "@/module/media/func";
import { TitlePhotos } from "@/module/media/component";

export async function generateMetadata({
  params,
}: PageProps<"/tv/[id]/imageviewer">) {
  const { id } = await params;
  const title = await getMetadataTvShow(id);

  return { title };
}

export default async function ImageViewer({
  params,
}: PageProps<"/tv/[id]/imageviewer">) {
  const { id } = await params;
  const response = await getAllMediaImage(id, "tv");

  return <TitlePhotos data={response} />;
}
