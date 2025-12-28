import AlertError from "@/components/ui/alert";
import Section from "@/components/ui/section";
import { isApiError } from "@/lib/fetcher";
import { CarouselSkeleton } from "@/module/carousel/fallback";
import { SimilarTitles, TitleReviews } from "@/module/titles/title-component";
import HeroSection, { Metadata } from "@/module/titles/title-detail-component";
import { getMovieDetails } from "@/module/titles/title-details-api";
import {
  ImageSection,
  VideoSection,
} from "@/module/titles/title-media-component";
import React, { Suspense } from "react";

export async function generateMetadata({ params }: PageProps<"/movie/[id]">) {
  const id = (await params).id;
  const data = await getMovieDetails(id);

  if (isApiError(data)) {
    return {
      title: data.status_message,
    };
  }
  const { title, date } = data;
  const year = date ? new Date(date).getFullYear() : null;

  return { title: `${title}${year ? " (" + year + ")" : ""}` };
}

export default async function Movies({ params }: PageProps<"/movie/[id]">) {
  const paramId = (await params).id;
  const response = await getMovieDetails(paramId);

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
    budget,
    certification,
    date,
    directors,
    stars,
    genres,
    id,
    original_language,
    overview,
    poster_path,
    production_companies,
    production_countries,
    revenue,
    runtime,
    spoken_languages,
    status,
    tagline,
    title,
    trailer,
    vote_average,
    vote_count,
    pathname,
  } = response;

  return (
    <div className="pb-8">
      {/* ========================= Hero Section ======================= */}
      <HeroSection
        media_type="movie"
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
          runtime,
          tagline,
          title,
          trailer,
          vote_average,
          vote_count,
          pathname,
        }}
      />
      <div className="title-detail-layout pt-4">
        {/* ============================================================== */}
        <Metadata
          media_type="movie"
          data={{
            budget,
            date,
            id,
            original_language,
            production_companies,
            production_countries,
            revenue,
            spoken_languages,
            status,
          }}
        />
        {/* //todo: Media Gallery */}
        <div className="mdia space-y-8">
          <ImageSection id={id} media_type="movie" />
          <VideoSection id={id} media_type="movie" />
        </div>
        <div className="rest">
          <Section title="Similar to this">
            <Suspense fallback={<CarouselSkeleton />}>
              <SimilarTitles id={id} media_type="movie" />
            </Suspense>
          </Section>
          <Section title="Reviews" href="/">
            <Suspense fallback={<CarouselSkeleton />}>
              <TitleReviews id={id} media_type="movie" />
            </Suspense>
          </Section>
        </div>
      </div>
    </div>
  );
}
