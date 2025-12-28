import { ApiErrorProps, isApiError } from "@/lib/fetcher";
import { MediaImageProps, MediaVideoProps } from "../titles/title-media-types";
import AlertError from "@/components/ui/alert";
import PosterPicture, { BackdropImage } from "@/components/ui/image";
import Link from "next/link";
import { Route } from "next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import Paper from "@mui/material/Paper";
import { API_IMG, cn } from "@/lib/utils";
import Alert from "@mui/material/Alert";
import IFrame from "@/components/ui/iframe";

export function TitlePhotos({
  data,
}: {
  data:
    | ApiErrorProps
    | {
        info: {
          title: string;
          returnUrl: string;
          background: string;
        };
        medias: MediaImageProps[];
      };
}) {
  if (isApiError(data)) {
    return (
      <div className="@container 4xl:gap-4">
        <AlertError error={data.status_code} message={data.status_message} />
      </div>
    );
  }

  const { info, medias } = data;
  return (
    <>
      <div className="scanlines relative h-80 p-2 4xl:p-4">
        <BackdropImage
          alt=""
          src={info.background}
          className="-z-10 brightness-50 grayscale-25"
        />
        <Link
          href={info.returnUrl as Route}
          className="flex w-max items-center gap-x-2 transition-colors typography-h4 hover:text-primary"
        >
          <ArrowBackIcon />
          Return
        </Link>
        <h1>{info.title}</h1>
      </div>

      <div className="flex flex-wrap gap-2 p-2 4xl:p-4">
        {medias.map(({ aspect, url, pathname }, i) => (
          <PosterPicture
            key={`${i}-${Math.random()}`}
            className={cn(
              aspect,
              aspect === "aspect-2/3" ? "grow-0 basis-12" : "grow basis-24",
              aspect === "aspect-4/3"
                ? "3xl:last-of-type:max-w-1/2"
                : undefined,
              "relative block h-30 shrink-0 overflow-clip border md:h-36 2xl:h-44",
            )}
            // ? ==========================================
            href={url}
            alt={`media ${i + 1}`}
            src={pathname}
          />
        ))}
      </div>
    </>
  );
}

export function TitlePhoto({
  id,
  pathname,
  media_type,
}: {
  id: string;
  pathname: string;
  media_type: "movie" | "tv";
}) {
  return (
    <div className="flex h-full min-h-full flex-col">
      <div className="flex justify-between p-2 4xl:p-4">
        <Link
          href={`/${media_type}/${id}`}
          className="flex w-max shrink-0 grow-0 items-center gap-x-2 transition-colors typography-h4 hover:text-primary"
        >
          <ArrowBackIcon />
          Return
        </Link>

        <Link
          href={`/${media_type}/${id}/imageviewer` as Route}
          title="Photo Collections"
          className="shrink-0 grow-0 hover:text-primary"
        >
          <Grid3x3Icon />
        </Link>
      </div>

      <div className="relative grid shrink grow grid-cols-1 grid-rows-1 supports-[height:stretch]:h-[stretch]">
        <BackdropImage
          src={`${API_IMG}/${pathname}`}
          alt={pathname}
          className="min-w-0 object-contain object-center"
          sizes="100vw"
          quality={100}
        />
      </div>
    </div>
  );
}

export function TitleVideos({
  data,
}: {
  data:
    | ApiErrorProps
    | {
        info: {
          title: string;
          returnUrl: string;
          background: string;
        };
        videos: MediaVideoProps[];
      };
}) {
  if (isApiError(data))
    return (
      <div className="p-2 4xl:p-4">
        <AlertError error={data.status_code} message={data.status_message} />
      </div>
    );

  const { info, videos } = data;

  return (
    <>
      <div className="scanlines relative h-80 p-2 4xl:p-4">
        <BackdropImage
          alt=""
          src={info.background}
          className="-z-10 brightness-50 grayscale-25"
        />
        <Link
          href={info.returnUrl as Route}
          className="flex w-max items-center gap-x-2 transition-colors typography-h4 hover:text-primary"
        >
          <ArrowBackIcon />
          Return
        </Link>

        <h1>{info.title}</h1>
      </div>

      {videos.length > 0 ? (
        <div className="grid-flexible grid gap-2 p-2 [--grid-max-col-count:4] [--grid-min-col-size:9rem] xl:[--grid-min-col-size:12rem] 4xl:p-4">
          {videos.map(({ id, name, pathname, url }) => (
            <PosterPicture
              key={id}
              src={pathname}
              alt={name}
              href={url}
              className="aspect-4/3"
            />
          ))}
        </div>
      ) : (
        <div className="p-2 4xl:p-4">
          <Alert>
            <>No video available.</>
          </Alert>
        </div>
      )}
    </>
  );
}

export function TitleVideo({
  id,
  ytKey,
  media_type,
}: {
  id: string;
  ytKey: string;
  media_type: "movie" | "tv";
}) {
  return (
    <div className="flex h-full min-h-full flex-col">
      <div className="flex justify-between p-2 4xl:p-4">
        <Link
          href={`/${media_type}/${id}`}
          className="flex w-max shrink-0 grow-0 items-center gap-x-2 transition-colors typography-h4 hover:text-primary"
        >
          <ArrowBackIcon />
          Return
        </Link>

        <Link
          href={`/${media_type}/${id}/video` as Route}
          title="Photo Collections"
          className="shrink-0 grow-0 hover:text-primary"
        >
          <Grid3x3Icon />
        </Link>
      </div>

      <div className="grid shrink grow basis-full items-center">
        <div className="bg-secondary/5">
          <IFrame src={ytKey} className="aspect-video max-h-128 rounded-none" />
        </div>
      </div>
    </div>
  );
}
