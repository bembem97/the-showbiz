import { TitleVideo } from "@/module/media/component";
import { getMetadataMovie } from "@/module/media/func";
import React from "react";

export async function generateMetadata({
  params,
}: PageProps<"/movie/[id]/video/[key]">) {
  const { id } = await params;
  const title = await getMetadataMovie(id);

  return { title };
}

export default async function VideoPage({
  params,
}: PageProps<"/movie/[id]/video/[key]">) {
  const { id, key } = await params;
  return <TitleVideo media_type="movie" id={id} ytKey={key} />;
}
