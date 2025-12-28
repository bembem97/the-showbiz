"use client";

import React from "react";
import {
  Carousel,
  CarouselContainer,
  CarouselItem,
  CarouselNext,
  CarouselParallax,
  CarouselPrevious,
  CarouselSlides,
  CarouselViewport,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ApiErrorProps, isApiError } from "@/lib/fetcher";
import { HeroProps } from "./api";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AlertError from "@/components/ui/alert";
import TrailerButton from "../trailer/trailer-button";
import InfoIcon from "@mui/icons-material/Info";

type Props = Omit<React.ComponentProps<typeof Image>, "src"> & {
  src: string;
};

export function BackdropImage({ className, src, ...props }: Props) {
  return (
    <Image
      src={src}
      data-slot="background-image"
      fill
      sizes="100vw, (min-width: 48rem) 75vw"
      className={cn(
        "object-cover text-center align-middle text-xs italic",
        className,
      )}
      {...props}
    />
  );
}

export default function HeroCarousel({
  data,
}: {
  data: ApiErrorProps | HeroProps[];
}) {
  const plugin = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    }),
  );

  if (isApiError(data)) {
    return (
      <div className="min-h-112 min-w-0 p-4">
        <AlertError error={data.status_code} message={data.status_message} />
      </div>
    );
  }

  return (
    <header>
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true, align: "start" }}
      >
        <CarouselContainer className="relative [--slide-size:100%] [--slide-spacing:0.5rem] 3xl:[--slide-size:80%]">
          <CarouselViewport>
            <CarouselSlides className="ml-(--ml)">
              <CarouselParallax>
                {data.map(
                  ({
                    backdrop_path,
                    id,
                    loading,
                    media_type,
                    priority,
                    release_date,
                    title,
                    vote_average,
                    trailer,
                  }) => (
                    <CarouselItem
                      key={id}
                      className="max-h-112 max-w-4xl min-w-0 shrink-0 grow-0 basis-(--slide-size) pl-(--slide-spacing) max-lg:min-h-60 lg:aspect-16/10"
                      style={
                        {
                          transform: "translate3d(0, 0, 0)",
                        } as React.CSSProperties
                      }
                    >
                      <div
                        data-slot="hero-slide-card"
                        className="relative size-full overflow-hidden lg:rounded-md lg:border lg:border-divider"
                      >
                        <div
                          className="scanlines relative flex h-full justify-center select-none"
                          data-slot="parallax-layer"
                        >
                          <BackdropImage
                            className="-z-10 block max-w-none shrink-0 grow-0 basis-(--basis) scale-120"
                            src={backdrop_path}
                            alt={title}
                            priority={priority}
                            loading={loading}
                            style={
                              {
                                "--basis":
                                  "calc(115% + (var(--slide-spacing) * 2))",
                              } as React.CSSProperties
                            }
                          />
                        </div>

                        <div
                          data-slot="hero-content"
                          className="scanlines absolute inset-0 flex flex-col justify-end gap-x-4 gap-y-4 px-4 py-6 backdrop-brightness-50 xl:px-10"
                        >
                          <p className="w-fit text-white text-shadow-lg typography-h1 dark:text-foreground">
                            {title}
                          </p>
                          <div className="flex items-center gap-x-1">
                            <Chip
                              label={media_type}
                              variant="outlined"
                              className="text-white dark:text-foreground"
                            />
                            <Chip
                              label={release_date}
                              variant="outlined"
                              className="text-white dark:text-foreground"
                            />
                            <Chip
                              label={vote_average}
                              variant="outlined"
                              className="text-white dark:text-foreground"
                            />
                          </div>
                          <div className="flex items-center gap-x-4">
                            {trailer ? (
                              <TrailerButton
                                media_type={media_type}
                                id={id}
                                data={trailer}
                              />
                            ) : null}
                            <Button
                              startIcon={<InfoIcon />}
                              href={`/${media_type}/${id}`}
                              component={Link}
                            >
                              More Info
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ),
                )}
              </CarouselParallax>
            </CarouselSlides>
          </CarouselViewport>
        </CarouselContainer>

        <CarouselPrevious className="absolute top-1/2 left-5 hidden -translate-y-1/2 border-primary text-primary 3xl:xl:[@media(hover:hover)]:inline-flex" />
        <CarouselNext className="absolute top-1/2 right-5 hidden -translate-y-1/2 border-primary text-primary 3xl:xl:[@media(hover:hover)]:inline-flex" />
      </Carousel>
    </header>
  );
}
