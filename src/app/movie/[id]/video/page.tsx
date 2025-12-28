import { TitleVideos } from "@/module/media/component";
import { getMetadataMovie } from "@/module/media/func";
import { getAllMediaVideo } from "@/module/titles/title-media-api";
import React from "react";

export async function generateMetadata({
  params,
}: PageProps<"/movie/[id]/video">) {
  const { id } = await params;
  const title = await getMetadataMovie(id);

  return { title };
}

export default async function VideoPage({
  params,
}: PageProps<"/movie/[id]/imageviewer">) {
  const { id } = await params;
  const data = await getAllMediaVideo(id, "movie");

  return <TitleVideos data={data} />;
}
