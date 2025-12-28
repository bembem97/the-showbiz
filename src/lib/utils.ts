import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_KEY = process.env.API_KEY;
export const API_URL = "https://api.themoviedb.org/3/";
export const API_IMG = "https://image.tmdb.org/t/p/original";

type ImageType = "poster" | "backdrop" | "avatar" | "default";

export const getImagePath = (
  src: string | null,
  type: ImageType = "poster",
): string => {
  if (src === null) {
    switch (type) {
      case "poster":
        return "/poster.png";
      case "backdrop":
        return "/backdrop.png";
      case "avatar":
        return "/avatar.png";
      default:
        return "/default.png";
    }
  }

  return `${API_IMG}${src}`;
};

export const getVoteAverage = (value: number | null) =>
  typeof value === "number" ? Number(value.toFixed(1)) : null;

// todo: "Prettifying" Date Format
const option = (value: undefined | string) => {
  switch (value) {
    case "year":
      return { year: "numeric" };
    case "short":
      return { day: "numeric", month: "short", year: "numeric" };
    case "long":
      return { day: "numeric", month: "long", year: "numeric" };
    default:
      return undefined;
  }
};

export function getPrettyDate(
  param: Date | string | null | undefined,
  { style = "short" }: { style?: "year" | "long" | "short" },
) {
  const date: string | Date | null | undefined =
    typeof param === "string" ? new Date(param) : param;

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return null; // Invalid date
  }

  const opts = option(style) as Intl.DateTimeFormatOptions;
  const formatter = new Intl.DateTimeFormat("en-US", opts).format(date);

  return formatter;
}

export function getReadableTime(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  if (time % 60 === 0) return `${hours}h`;

  return `${hours}h ${minutes}m`;
}

export function getNumberCompact(num: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

export function convertToCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
