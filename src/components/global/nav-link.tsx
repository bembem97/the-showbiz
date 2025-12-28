"use client";

import React from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavLink({
  className,
  children,
  href,
  ...props
}: React.ComponentProps<typeof NextLink>) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <NextLink
      color="inherit"
      href={href}
      {...props}
      className={cn(
        "flex rounded-sm px-2.5 py-1",
        { "not-dark:bg-black/15 dark:text-white": active },
        className,
      )}
    >
      {children}
    </NextLink>
  );
}
