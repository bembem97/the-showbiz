import Section from "@/components/ui/section";
import { CarouselSkeleton } from "@/module/carousel/fallback";
import {
  ActionAndAdventureShows,
  AnimatedShows,
  ComedyShows,
  CrimeShows,
  DocumentaryShows,
  DramaShows,
  KidsAndFamilyShows,
  MysteryShows,
  RealityShows,
  SciFiAndFantasyShows,
  TalkShows,
} from "@/module/carousel/tv-component";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Discover Tv Shows",
};

export default function Shows() {
  return (
    <div className="space-y-6 **:data-[slot=carousel-viewport]:px-2">
      <Section title="Action & Adventure">
        <Suspense fallback={<CarouselSkeleton />}>
          <ActionAndAdventureShows />
        </Suspense>
      </Section>
      <Section title="Animations">
        <Suspense fallback={<CarouselSkeleton />}>
          <AnimatedShows />
        </Suspense>
      </Section>
      <Section title="Comedy">
        <Suspense fallback={<CarouselSkeleton />}>
          <ComedyShows />
        </Suspense>
      </Section>
      <Section title="Crime">
        <Suspense fallback={<CarouselSkeleton />}>
          <CrimeShows />
        </Suspense>
      </Section>
      <Section title="Drama">
        <Suspense fallback={<CarouselSkeleton />}>
          <DramaShows />
        </Suspense>
      </Section>
      <Section title="Documentaries">
        <Suspense fallback={<CarouselSkeleton />}>
          <DocumentaryShows />
        </Suspense>
      </Section>
      <Section title="Kids & Family">
        <Suspense fallback={<CarouselSkeleton />}>
          <KidsAndFamilyShows />
        </Suspense>
      </Section>
      <Section title="Mystery">
        <Suspense fallback={<CarouselSkeleton />}>
          <MysteryShows />
        </Suspense>
      </Section>
      <Section title="Reality">
        <Suspense fallback={<CarouselSkeleton />}>
          <RealityShows />
        </Suspense>
      </Section>
      <Section title="Sci-Fi & Fantasy">
        <Suspense fallback={<CarouselSkeleton />}>
          <SciFiAndFantasyShows />
        </Suspense>
      </Section>
      <Section title="Talk Show">
        <Suspense fallback={<CarouselSkeleton />}>
          <TalkShows />
        </Suspense>
      </Section>
    </div>
  );
}
