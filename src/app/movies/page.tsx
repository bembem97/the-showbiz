import Section from "@/components/ui/section";
import { CarouselSkeleton } from "@/module/carousel/fallback";
import {
  ActionMovies,
  AnimatedAdventureMovies,
  ComedyMovies,
  FamilyMovies,
  FantasyMovies,
  HorrorMovies,
  MysteryMovies,
  SciFiMovies,
  ThrillerMovies,
  WesternMovies,
} from "@/module/carousel/movies-component";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Discover movies",
};

export default function Movies() {
  return (
    <div className="space-y-6 **:data-[slot=carousel-viewport]:px-2">
      <Section title="Action Films">
        <Suspense fallback={<CarouselSkeleton />}>
          <ActionMovies />
        </Suspense>
      </Section>
      <Section title="Toon Adventures">
        <Suspense fallback={<CarouselSkeleton />}>
          <AnimatedAdventureMovies />
        </Suspense>
      </Section>
      <Section title="Comedy Film">
        <Suspense fallback={<CarouselSkeleton />}>
          <ComedyMovies />
        </Suspense>
      </Section>
      <Section title="Family and friends">
        <Suspense fallback={<CarouselSkeleton />}>
          <FamilyMovies />
        </Suspense>
      </Section>
      <Section title="Fantasy Movies">
        <Suspense fallback={<CarouselSkeleton />}>
          <FantasyMovies />
        </Suspense>
      </Section>
      <Section title="Horror Movies">
        <Suspense fallback={<CarouselSkeleton />}>
          <HorrorMovies />
        </Suspense>
      </Section>
      <Section title="Mystery Movies">
        <Suspense fallback={<CarouselSkeleton />}>
          <MysteryMovies />
        </Suspense>
      </Section>
      <Section title="Science Fictions">
        <Suspense fallback={<CarouselSkeleton />}>
          <SciFiMovies />
        </Suspense>
      </Section>
      <Section title="Thriller Movies">
        <Suspense fallback={<CarouselSkeleton />}>
          <ThrillerMovies />
        </Suspense>
      </Section>
      <Section title="Western Movies">
        <Suspense fallback={<CarouselSkeleton />}>
          <WesternMovies />
        </Suspense>
      </Section>
    </div>
  );
}
