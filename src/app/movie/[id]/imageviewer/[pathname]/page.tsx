import { TitlePhoto } from "@/module/media/component";
import { getMetadataMovie } from "@/module/media/func";
import React from "react";

export async function generateMetadata({
  params,
}: PageProps<"/movie/[id]/imageviewer/[pathname]">) {
  const { id } = await params;
  const title = await getMetadataMovie(id);

  return { title };
}

export default async function ImageViewer({
  params,
}: PageProps<"/movie/[id]/imageviewer/[pathname]">) {
  const { pathname, id } = await params;

  return <TitlePhoto pathname={pathname} id={id} media_type="movie" />;
}
