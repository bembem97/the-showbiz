import Section from "@/components/ui/section";
import getHero from "@/module/hero/api";
import HeroCarousel from "@/module/hero/carousel";
import { CarouselSkeleton } from "@/module/carousel/fallback";
import {
  NetflixShows,
  PopularMovies,
  PopularShows,
  PopularStars,
  UpcomingMovies,
  UpcomingShows,
} from "@/module/carousel/home-component";
import { Suspense } from "react";

export default async function Home() {
  const hero = await getHero();

  return (
    <div className="space-y-6">
      <HeroCarousel data={hero} />

      <div className="space-y-6 **:data-[slot=carousel-viewport]:px-2">
        <Section title="Most Watched Films">
          <Suspense fallback={<CarouselSkeleton />}>
            <PopularMovies />
          </Suspense>
        </Section>

        <Section title="Binge-Worthy Series">
          <Suspense fallback={<CarouselSkeleton />}>
            <PopularShows />
          </Suspense>
        </Section>

        <Section title="Coming Soon to Theaters">
          <Suspense fallback={<CarouselSkeleton />}>
            <UpcomingMovies />
          </Suspense>
        </Section>

        <Section title="New Shows to Watch For">
          <Suspense fallback={<CarouselSkeleton />}>
            <UpcomingShows />
          </Suspense>
        </Section>

        <Section title="Stars of the Spotlight">
          <Suspense fallback={<CarouselSkeleton />}>
            <PopularStars />
          </Suspense>
        </Section>

        <Section title="Netflix Must-Watch Shows">
          <Suspense fallback={<CarouselSkeleton />}>
            <NetflixShows />
          </Suspense>
        </Section>
      </div>
    </div>
  );
}
