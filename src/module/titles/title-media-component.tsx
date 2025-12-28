import React from "react";
import { MediaImageProps } from "./title-media-types";
import Paper from "@mui/material/Paper";
import { cn } from "@/lib/utils";
import PosterPicture from "@/components/ui/image";
import { getMediaImage, getMediaVideo } from "./title-media-api";
import { isApiError } from "@/lib/fetcher";
import AlertError from "@/components/ui/alert";
import Section from "@/components/ui/section";
import { Route } from "next";
import Alert from "@mui/material/Alert";

export function ImageContainer({ data = [] }: { data: MediaImageProps[] }) {
  return (
    <div className="@container flex">
      <div className="flex h-full max-h-30 w-full gap-2 md:max-h-36 xl:max-h-44 3xl:max-h-48">
        {data.map(({ aspect, url, pathname }, i) => (
          <Paper
            key={`${i}-${Math.random()}`}
            className={cn(
              aspect,
              aspect === "aspect-2/3" ? "basis-1/5" : "basis-4/12",
              "relative inline-grid shrink grow overflow-clip",
            )}
          >
            <PosterPicture href={url} alt={`media ${i + 1}`} src={pathname} />
          </Paper>
        ))}
      </div>
    </div>
  );
}

export async function ImageSection({
  id,
  media_type,
}: {
  id: number;
  media_type: "movie" | "tv";
}) {
  const data = await getMediaImage(id.toString(), media_type);

  if (isApiError(data)) {
    return (
      <section className="p-2 4xl:p-4">
        <AlertError error={data.status_code} message={data.status_message} />
      </section>
    );
  }

  const firstItem = data.slice(0, 3);
  const secondItem = data.slice(2, data.length - 1);

  return (
    <Section
      title="Images"
      href={`/${media_type}/${id}/imageviewer` as Route}
      className="@container"
    >
      {firstItem.length > 0 ? (
        <ImageContainer data={firstItem} />
      ) : (
        <Alert className="h-48 place-items-center items-center">
          <>No image available.</>
        </Alert>
      )}
      <ImageContainer data={secondItem} />
    </Section>
  );
}

export async function VideoSection({
  id,
  media_type,
}: {
  id: number;
  media_type: "movie" | "tv";
}) {
  const data = await getMediaVideo(id.toString(), media_type);

  if (isApiError(data)) {
    return (
      <section className="p-2 4xl:p-4">
        <AlertError error={data.status_code} message={data.status_message} />
      </section>
    );
  }

  return (
    <Section
      title="Videos"
      href={`/${media_type}/${id}/video` as Route}
      className="@container"
    >
      <div className="flex gap-2 py-2 max-xl:grid-rows-1 max-xl:overflow-x-auto xl:grid xl:grid-cols-4">
        {data.length > 0 ? (
          data.map(({ url, pathname, id, name }, i) => (
            <div
              key={`${id}-${Math.random()}`}
              className={cn(
                "space-y-2",
                i === 0 && "xl:col-span-2",
                i === 1 && "xl:col-span-2 xl:col-end-5",
                "shrink-0 grow-0 basis-48",
              )}
            >
              <Paper className={cn("grid aspect-video overflow-clip")}>
                <PosterPicture
                  href={url}
                  alt={`media ${i + 1}`}
                  src={pathname}
                  className="relative"
                />
              </Paper>

              <p>{name}</p>
            </div>
          ))
        ) : (
          <Alert className="col-span-4 row-span-2 h-48 place-items-center items-center">
            <>No video available.</>
          </Alert>
        )}
      </div>
    </Section>
  );
}
