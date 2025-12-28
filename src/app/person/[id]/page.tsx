import AlertError from "@/components/ui/alert";
import ClampText from "@/components/ui/clamp-text";
import { BackdropImage } from "@/components/ui/image";
import { isApiError } from "@/lib/fetcher";
import KnownFor from "@/module/star/known-for-component";
import getStarDetails from "@/module/star/star-details-api";
import CircularProgress from "@mui/material/CircularProgress";
import { Route } from "next";
import Link from "next/link";
import { Suspense } from "react";
import AddIcon from "@mui/icons-material/Add";
import StarCredits from "@/module/star/star-credits-component";
import Button from "@mui/material/Button";
import TSLink from "@/components/ui/link";
import Paper from "@mui/material/Paper";

export async function generateMetadata({ params }: PageProps<"/person/[id]">) {
  const id = (await params).id;
  const data = await getStarDetails(id);

  if (isApiError(data)) {
    return {
      title: data.status_message,
    };
  }

  return {
    title: data.name,
  };
}

export default async function Person({ params }: PageProps<"/person/[id]">) {
  const { id: paramId } = await params;
  const data = await getStarDetails(paramId);

  if (isApiError(data)) {
    return (
      <div className="p-2">
        <AlertError error={data.status_code} message={data.status_message} />
      </div>
    );
  }

  const {
    biography,
    birthday,
    deathday,
    known_for,
    name,
    pathname,
    place_of_birth,
    profile_path,
  } = data;

  return (
    <div className="star-layout p-2">
      <h1 className="text-center [grid-area:name] 2xl:text-left">{name}</h1>
      {/* 
        //todo================= Lifetime =======================================
        //todo================= Birthdate & Place of birth =====================
        //todo================= Date deceased ==================================
        //todo================= Field known for ================================
      */}
      <section className="relative mb-4 [grid-area:lifetime]">
        <h2 className="sr-only absolute top-0 left-0 text-xs">
          Life and legacy
        </h2>

        <p className="flex flex-col flex-wrap items-center justify-center xl:flex-row 2xl:justify-start">
          {birthday && (
            <span>
              Born <time dateTime={birthday}>{birthday}</time>, in{" "}
              {place_of_birth}.&nbsp;
            </span>
          )}
          {deathday && (
            <span>
              Died <time dateTime={deathday}>{deathday}.&nbsp;</time>
            </span>
          )}
          <span className="lowercase first-letter:capitalize">
            Well-known in the {known_for} community.
          </span>
        </p>
      </section>

      {/* //todo: Known for */}
      <section className="[grid-area:cast]">
        <h2 className="border-none text-base">Known For</h2>
        <Suspense fallback={<CircularProgress className="h-45" />}>
          <KnownFor id={paramId} />
        </Suspense>
      </section>

      {/* //todo: Biography */}
      <section className="col-[profile-start/bio-end] row-[bio-start/bio-end]">
        {/* //todo: Invisible Shape Margin */}
        <div
          className="float-left hidden h-(--height) w-(--width) 3xl:block 4xl:hidden 5xl:block"
          style={
            {
              "--height": "180px",
              "--width": "calc(var(--spacing) * 66.5 + 1rem)",
              "--poly": "0% 0%, 100% 0%, 100% 100%, 0% 100%",
              shapeOutside: "polygon(var(--poly))",
              clipPath: "polygon(var(--poly))",
            } as React.CSSProperties
          }
        />

        {/* //todo: Biography */}
        <h2 className="text-base">Biography</h2>
        {biography ? (
          <ClampText text={biography} className="text-sm/6" />
        ) : (
          <p className="italic">{`We don't have a biography for ${name}.`}</p>
        )}
      </section>

      {/* //todo: Profile Picture */}
      <div
        role="group"
        className="relative isolate mx-auto grid aspect-2/3 w-60 overflow-hidden rounded-md border border-divider [grid-area:profile] 2xl:w-full"
      >
        <Paper
          component={TSLink}
          title={`${name}'s profile`}
          className="scanlines relative hover:flicker"
          href={`/person/${paramId}/imageviewer${pathname}` as Route}
        >
          <BackdropImage
            priority
            alt={name}
            src={profile_path}
            className="scale-105 transition-transform"
          />
        </Paper>

        <Button
          component={TSLink}
          startIcon={<AddIcon />}
          href={`/person/${paramId}/imageviewer` as Route}
          className="absolute right-2 bottom-2"
        >
          Photos
        </Button>
      </div>

      {/* //todo: Credits */}
      <section className="space-y-4 [grid-area:credit]">
        <h2>Credits</h2>
        <Suspense fallback={<CircularProgress />}>
          <StarCredits known_for={known_for} id={paramId} />
        </Suspense>
      </section>
    </div>
  );
}
