import Link from "@mui/material/Link";
import React from "react";
import TSLink from "./link";
import { Route } from "next";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<typeof Link> {
  src: string;
  alt: string;
  ImageClassName?: string;
}

export default function PosterPicture({
  href,
  src,
  alt,
  className,
  ImageClassName,
  ...rest
}: Props) {
  return (
    <Link
      {...rest}
      className={cn(
        "group scanlines relative isolate grid overflow-clip rounded-md border border-divider hover:flicker",
        className,
      )}
      href={href as Route}
      component={TSLink}
    >
      <Image
        alt={alt}
        src={src}
        data-slot="background-image"
        fill
        sizes="100vw, (min-width: 48rem) 75vw"
        className={cn(
          "object-cover text-center align-middle text-xs italic",
          "transition-all group-hover:scale-105 hover:brightness-75 hover:grayscale-75",
          ImageClassName,
        )}
      />
    </Link>
  );
}

export function PosterImage({
  className,
  ...props
}: React.ComponentProps<typeof Image>) {
  return (
    <Image
      data-slot="poster-image"
      className={cn(
        "block object-contain object-center text-center align-middle text-xs italic",
        className,
      )}
      {...props}
    />
  );
}

export function BackdropImage({
  className,
  src,
  ...props
}: React.ComponentProps<typeof Image>) {
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
