import { cn } from "@/lib/utils";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Route } from "next";
import Link from "next/link";
import React from "react";

interface Props extends React.ComponentProps<"section"> {
  href?: Route;
  title: string;
}

export default function Section({
  children,
  className,
  href,
  title,
  ...props
}: Props) {
  return (
    <section className={cn("relative space-y-2", className)} {...props}>
      <div className="flex h-9 items-center px-4">
        {href ? (
          <h2
            data-slot="section-header"
            className="inline-grid w-max hover:border-white"
          >
            <Link href={href} className="inline-flex items-center gap-x-1">
              <span className="typography-h2">{title}</span>
              <ChevronRightIcon className="mt-1 inline-block size-7 text-primary" />
            </Link>
          </h2>
        ) : (
          <h2 data-slot="section-header" className="w-max">
            {title}
          </h2>
        )}
      </div>
      {children}
    </section>
  );
}
