import AlertError from "@/components/ui/alert";
import Section from "@/components/ui/section";
import { isApiError } from "@/lib/fetcher";
import { CarouselSkeleton } from "@/module/carousel/fallback";
import {
  Seasons,
  SimilarTitles,
  TitleReviews,
} from "@/module/titles/title-component";
import HeroSection, {
  EpisodeInfo,
  Metadata,
} from "@/module/titles/title-detail-component";
import { getTvShowDetails } from "@/module/titles/title-details-api";
import {
  ImageSection,
  VideoSection,
} from "@/module/titles/title-media-component";
import React, { Suspense } from "react";

export async function generateMetadata({ params }: PageProps<"/tv/[id]">) {
  const id = (await params).id;
  const data = await getTvShowDetails(id);

  if (isApiError(data)) {
    return {
      title: data.status_message,
    };
  }
  const { title, date } = data;
  const year = date ? new Date(date).getFullYear() : null;

  return { title: `${title}${year ? " (" + year + ")" : ""}` };
}

export default async function Shows({ params }: PageProps<"/tv/[id]">) {
  const paramId = (await params).id;
  const response = await getTvShowDetails(paramId);

  if (isApiError(response)) {
    return (
      <div className="p-2 4xl:p-4">
        <AlertError
          error={response.status_code}
          message={response.status_message}
        />
      </div>
    );
  }

  const {
    backdrop_path,
    certification,
    date,
    directors,
    genres,
    id,
    last_episode,
    networks,
    next_episode,
    original_language,
    overview,
    poster_path,
    production_companies,
    production_countries,
    seasons,
    spoken_languages,
    stars,
    status,
    tagline,
    trailer,
    title,
    total_episodes,
    total_seasons,
    type,
    vote_average,
    vote_count,
    season_range,
    pathname,
  } = response;

  return (
    <div className="pb-8">
      {/* ========================= Hero Section ======================= */}
      <HeroSection
        media_type="tv"
        data={{
          backdrop_path,
          certification,
          date,
          directors,
          id,
          stars,
          genres,
          overview,
          poster_path,
          tagline,
          title,
          trailer,
          vote_average,
          vote_count,
          season_range,
          pathname,
        }}
      />
      <div className="title-detail-layout pt-4">
        {/* ============================================================== */}
        <Metadata
          media_type="tv"
          data={{
            total_episodes,
            total_seasons,
            type,
            networks,
            date,
            id,
            original_language,
            production_companies,
            production_countries,
            spoken_languages,
            status,
          }}
        />

        {/* //todo: Media gallery, Seasons, and Episodes */}
        <div className="mdia @container space-y-8">
          <Section title="Episode">
            <div className="grid grid-cols-1 gap-2 @xl:grid-cols-2">
              {last_episode ? (
                <div className="flex flex-col space-y-2">
                  <h3 className="ml-4 w-fit shrink grow-0 text-foreground">
                    Last Episode
                  </h3>
                  <EpisodeInfo
                    data={last_episode}
                    className="shrink grow supports-[height:stretch]:h-[stretch]"
                  />
                </div>
              ) : null}
              {next_episode ? (
                <div className="flex flex-col space-y-2">
                  <h3 className="ml-4 w-fit shrink grow-0 text-foreground">
                    Next Episode
                  </h3>
                  <EpisodeInfo
                    data={next_episode}
                    className="shrink grow supports-[height:stretch]:h-[stretch]"
                  />
                </div>
              ) : null}
            </div>
          </Section>

          <Section title="Season">
            <Seasons data={seasons} />
          </Section>

          {/* //todo: Media Gallery */}
          <ImageSection id={id} media_type="tv" />
          <VideoSection id={id} media_type="tv" />
        </div>

        <div className="rest">
          <Section title="Similar to this">
            <Suspense fallback={<CarouselSkeleton />}>
              <SimilarTitles id={id} media_type="tv" />
            </Suspense>
          </Section>
          <Section title="Reviews" href="/">
            <Suspense fallback={<CarouselSkeleton />}>
              <TitleReviews id={id} media_type="tv" />
            </Suspense>
          </Section>
        </div>
      </div>
    </div>
  );
}
