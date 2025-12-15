"use client";

import React from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

export default function NavLink({
  className,
  children,
  href,
  ...props
}: React.ComponentProps<typeof NextLink>) {
  const segments = useSelectedLayoutSegments();
  const mediaType = segments[0];

  const active = mediaType === href || href === "/";

  return (
    <NextLink
      href={href}
      {...props}
      className={cn(
        "inline-flex px-0.5",
        { "not-dark:underline dark:text-primary": active },
        className,
      )}
    >
      {children}
    </NextLink>
  );
}
