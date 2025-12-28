import Link from "@mui/material/Link";
import React from "react";
import TSLink from "../ui/link";
import { cn } from "@/lib/utils";
import { brunoAceSc } from "@/app/layout";

export default function BrandName({
  className,
  ...rest
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...rest}
      href="/"
      component={TSLink}
      className={cn(
        "text-foreground typography-h2 dark:text-secondary",
        brunoAceSc.className,
        className,
      )}
    >
      TheShowbiz
    </Link>
  );
}
