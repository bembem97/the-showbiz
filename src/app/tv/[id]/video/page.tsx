import { TitleVideos } from "@/module/media/component";
import { getMetadataTvShow } from "@/module/media/func";
import { getAllMediaVideo } from "@/module/titles/title-media-api";
import React from "react";

export async function generateMetadata({
  params,
}: PageProps<"/tv/[id]/video">) {
  const { id } = await params;
  const title = await getMetadataTvShow(id);

  return { title };
}

export default async function VideoPage({
  params,
}: PageProps<"/tv/[id]/imageviewer">) {
  const { id } = await params;
  const data = await getAllMediaVideo(id, "tv");

  return <TitleVideos data={data} />;
}
