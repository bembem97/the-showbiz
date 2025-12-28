import { TitleVideo } from "@/module/media/component";
import { getMetadataMovie, getMetadataTvShow } from "@/module/media/func";
import React from "react";

export async function generateMetadata({
  params,
}: PageProps<"/tv/[id]/video/[key]">) {
  const { id } = await params;
  const title = await getMetadataTvShow(id);

  return { title };
}

export default async function VideoPage({
  params,
}: PageProps<"/tv/[id]/video/[key]">) {
  const { id, key } = await params;
  return <TitleVideo media_type="tv" id={id} ytKey={key} />;
}
