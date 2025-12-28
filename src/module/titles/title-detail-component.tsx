import Image from "next/image";
import {
  EpisodeProps,
  HeroHeaderProps,
  MetadataProps,
  SeasonProps,
} from "./title-detail-types";
import {
  DataDescription,
  DataList,
  DataTerm,
  TitleRate,
  TitleScore,
  TitleScoreBadge,
} from "@/components/ui/data-display";
import PosterPicture, { PosterImage } from "@/components/ui/image";
import { Route } from "next";
import TrailerButton from "../trailer/trailer-button";
import Paper from "@mui/material/Paper";
import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Keywords } from "./title-keywords";
import { cn } from "@/lib/utils";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import TSLink from "@/components/ui/link";
import ListItemText from "@mui/material/ListItemText";
import WatchlistButton from "../cta/watchlist/button";
import FavoriteButton from "../cta/favorite/button";
import WatchButton from "../cta/watch/button";
import { ReviewCount } from "./title-reviews";

export default function HeroSection({
  data,
  media_type,
}: {
  data: HeroHeaderProps;
  media_type: "movie" | "tv";
}) {
  const {
    backdrop_path,
    certification,
    date,
    genres,
    id,
    poster_path,
    trailer,
    tagline,
    title,
    vote_average,
    vote_count,
    pathname,
    directors,
    overview,
    stars,
  } = data;

  const year = date ? new Date(date).getFullYear() : null;

  return (
    <header>
      <div className="scanlines relative grid min-h-112.5 auto-rows-min content-end overflow-clip border-b border-divider">
        <Image
          alt={title}
          src={backdrop_path}
          fill
          sizes="100vw, (min-width: 48rem) 75vw"
          className="-z-10 object-cover text-center align-middle text-xs italic brightness-30"
        />

        {/* //todo: Hero Section Content */}
        <div className="title-details-layout grid auto-rows-min gap-y-2 p-2 4xl:p-4">
          <div className="[grid-area:ttl]">
            <h1 className="text-shadow-sm">{title}</h1>

            <div className="scrollbar-hidden 3xl:scrollbar-thin flex flex-wrap items-center gap-0.5 divide-x overflow-x-auto">
              {genres.map(({ id, name }) => (
                // <Chip key={id} label={name} />
                <span
                  key={id}
                  className="inline-block border-divider leading-5 typography-body2 not-first-of-type:pl-2 not-last-of-type:pr-2"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center divide-x divide-divider [grid-area:nfo] *:border-divider *:px-2 *:typography-body2">
            {"season_range" in data ? (
              <div>
                <span className="sr-only">Year range </span>
                {data.season_range}
              </div>
            ) : (
              <div>
                <span className="sr-only">Year release </span>
                {year}
              </div>
            )}
            {"runtime" in data && data.runtime ? (
              <div>
                <span className="sr-only">Runtime </span>
                {data.runtime}
              </div>
            ) : null}
            {certification ? (
              <div>
                <span className="sr-only">Motion picture rating. Rated </span>
                {certification}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-x-2 [grid-area:scr]">
            <TitleScore vote_average={vote_average} vote_count={vote_count} />
            <TitleRate />
          </div>

          <div className="[grid-area:pos]">
            <PosterPicture
              href={`/${media_type}/${id}/imageviewer${pathname}` as Route}
              alt={title}
              src={poster_path}
              className="aspect-2/3 w-24 shadow-black transition-all hover:shadow-sm xl:w-28 2xl:w-42"
            />
          </div>
          {tagline ? (
            <div className="[grid-area:tag]">
              <p className="text-sm leading-6 italic">{tagline}</p>
            </div>
          ) : null}

          <div className="flex items-end gap-x-2 [grid-area:btn] max-xl:*:shrink max-xl:*:grow max-xl:*:basis-1/2">
            {trailer ? (
              <TrailerButton media_type={media_type} id={id} data={trailer} />
            ) : null}
          </div>
        </div>
      </div>

      {/* //todo: ========================================================== */}
      <div className="mb-4 grid auto-rows-min grid-cols-1 gap-2 border-b px-2 pb-4 4xl:gap-4 5xl:grid-cols-12">
        <div className="@container 5xl:col-span-9">
          {/* //todo: Overview */}
          <div className="mb-4 border-b p-2 py-4">
            <h2 className="sr-only mb-4 w-fit">
              {overview ? "Overview" : "No overview"}
            </h2>
            {overview ? <p>{overview}</p> : null}
          </div>

          {/* //todo: Directors | Creators */}
          <div className="flex flex-col p-2 3xl:flex-row 3xl:flex-wrap 3xl:items-center">
            <h2 className="typography-sm mr-2 border-none leading-normal">
              {"runtime" in data && directors.length > 1
                ? "Directors"
                : "runtime" in data && directors.length < 2
                  ? "Director"
                  : "season_rage" in data && directors.length > 1
                    ? "Creators"
                    : "Creator"}
            </h2>
            {directors.length > 0 ? (
              <List
                sx={{ all: "unset" }}
                className="flex w-fit shrink grow flex-col *:border-transparent max-3xl:w-full 3xl:flex-row 3xl:flex-wrap 3xl:divide-x 3xl:divide-y-0 3xl:*:border-divider"
              >
                {directors.map(({ id, name }) => (
                  <ListItem
                    key={id}
                    sx={{ all: "unset" }}
                    className="3xl:not-first-of-type:*:pl-2 3xl:not-last-of-type:*:pr-2"
                  >
                    <ListItemButton
                      href={`/person/${id}` as Route}
                      component={TSLink}
                      className="p-0 hover:bg-[initial] max-3xl:py-4"
                    >
                      <>
                        <ListItemText
                          primary={name}
                          slotProps={{
                            primary: {
                              className: "leading-5 text-foreground",
                            },
                          }}
                          className="px-0"
                        />
                      </>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <p className="typography-xs text-muted-foreground italic">
                Not provided
              </p>
            )}
          </div>

          {/* //todo: Starring Actors */}
          <div className="flex flex-col p-2 2xl:flex-row 2xl:flex-wrap 3xl:items-center">
            <h2 className="typography-sm mr-2 border-none leading-normal">
              {stars.length > 1 ? "Stars" : "Star"}
            </h2>
            <List
              sx={{ all: "unset" }}
              className="flex w-fit shrink grow flex-col *:border-transparent max-2xl:w-full 3xl:flex-row 3xl:flex-wrap 3xl:divide-x 3xl:divide-y-0 3xl:*:border-divider"
            >
              {stars.map(({ id, name }) => (
                <ListItem
                  key={id}
                  sx={{ all: "unset" }}
                  className="3xl:not-first-of-type:*:pl-2 3xl:not-last-of-type:*:pr-2"
                >
                  <ListItemButton
                    href={`/person/${id}` as Route}
                    component={TSLink}
                    className="p-0 hover:bg-[initial] max-3xl:py-4"
                  >
                    <>
                      <ListItemText
                        primary={name}
                        slotProps={{
                          primary: {
                            className: "leading-5 text-foreground",
                          },
                        }}
                        className="px-0"
                      />
                    </>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
        </div>

        {/* //todo: Call to actions | Bookmarks | Save Titles */}
        <div className="@container grid items-center 5xl:col-start-10 5xl:col-end-13">
          <div className="grid grid-cols-1 gap-2 py-2 pr-2 4xl:py-4 4xl:pr-4 @lg:grid-cols-2">
            <WatchlistButton />
            <FavoriteButton />
            <WatchButton />

            <Suspense fallback={<CircularProgress />}>
              <ReviewCount id={id} media_type={media_type} />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Metadata({
  data,
  media_type,
}: {
  data: MetadataProps;
  media_type: "movie" | "tv";
}) {
  const {
    date,
    id,
    original_language,
    production_companies,
    production_countries,
    spoken_languages,
    status,
  } = data;
  return (
    <section className="meta">
      <div className="grid h-fit auto-rows-min gap-y-4">
        {/* //todo: Metadata */}
        <Paper className="p-4">
          <h2 className="sr-only">Details</h2>
          <DataList className="*:[dd]:mb-2">
            <DataTerm>Release Date</DataTerm>
            <DataDescription>{date || "unknown"}</DataDescription>
            <DataTerm>Status</DataTerm>
            <DataDescription>{status}</DataDescription>
            <DataTerm>
              Spoken {spoken_languages.length > 1 ? "Languages" : "Language"}
            </DataTerm>
            {spoken_languages.map(({ english_name, iso_639_1 }) => (
              <DataDescription key={iso_639_1}>{english_name}</DataDescription>
            ))}
            <DataTerm>Original Language</DataTerm>
            <DataDescription>
              {spoken_languages.find(
                ({ iso_639_1 }) => iso_639_1 === original_language,
              )?.english_name || "—"}
            </DataDescription>
            {"networks" in data &&
            "type" in data &&
            "total_episodes" in data &&
            "total_seasons" in data ? (
              <>
                <DataTerm>Networks</DataTerm>
                {data.networks.map(({ id, logo_path, name }) => (
                  <DataDescription key={id}>
                    <figure className="flex gap-1">
                      <PosterImage
                        width={200}
                        height={200}
                        src={logo_path}
                        alt={name}
                        className="aspect-square size-9 invert-100"
                      />
                      <figcaption>
                        <span className="text-sm">{name}</span>
                      </figcaption>
                    </figure>
                  </DataDescription>
                ))}
                <DataTerm>Type</DataTerm>
                <DataDescription>{data.type}</DataDescription>
                <DataTerm>
                  {parseInt(data.total_episodes) > 1
                    ? "Total Episodes"
                    : "Total Episode"}
                </DataTerm>
                <DataDescription>{data.total_episodes}</DataDescription>
                <DataTerm>
                  {parseInt(data.total_seasons) > 1
                    ? "Total Seasons"
                    : "Total Season"}
                </DataTerm>
                <DataDescription>{data.total_seasons}</DataDescription>
              </>
            ) : null}
          </DataList>
        </Paper>
        {/* // todo: Finances */}
        {"budget" in data && "revenue" in data ? (
          <Paper className="p-4">
            <h2 className="sr-only">Finances</h2>
            <DataList className="*:[dd]:mb-2">
              <DataTerm>Budget</DataTerm>
              <DataDescription>{data.budget}</DataDescription>
              <DataTerm>Box Office</DataTerm>
              <DataDescription>{data.revenue}</DataDescription>
            </DataList>
          </Paper>
        ) : null}
        {/* // todo: Production */}
        <Paper className="p-4">
          <h2 className="sr-only">Production</h2>
          <DataList>
            <DataTerm>
              Production{" "}
              {production_companies.length > 1 ? "Companies" : "Company"}
            </DataTerm>
            <div className="mb-2">
              {production_companies.map(
                ({ id, logo_path, name, origin_country }) => (
                  <DataDescription key={id}>
                    <figure className="flex gap-1">
                      <PosterImage
                        width={200}
                        height={200}
                        src={logo_path}
                        alt={name}
                        className="aspect-square size-9 invert-100"
                      />
                      <figcaption>
                        <span className="text-sm">
                          {name} {origin_country ? `(${origin_country})` : null}
                        </span>
                      </figcaption>
                    </figure>
                  </DataDescription>
                ),
              )}
            </div>
            <DataTerm>
              Production{" "}
              {production_countries.length > 1 ? "Countries" : "Country"}
            </DataTerm>
            {production_countries.map(({ iso_3166_1, name }) => (
              <DataDescription key={iso_3166_1}>{name}</DataDescription>
            ))}
          </DataList>
        </Paper>
        {/* //todo: Keywords */}
        <Paper className="space-y-4 p-4">
          <h2 className="w-fit border-none text-xs font-bold tracking-wide text-foreground">
            Keywords
          </h2>
          <Suspense fallback={<CircularProgress />}>
            <Keywords id={id} media_type={media_type} />
          </Suspense>
        </Paper>
      </div>
    </section>
  );
}

export function EpisodeInfo({
  className,
  data,
}: {
  className?: string;
  data: EpisodeProps;
}) {
  const {
    air_date,
    episode_number,
    name,
    overview,
    runtime,
    season_number,
    vote_average,
    vote_count,
  } = data;
  return (
    <Paper
      className={cn(
        "flex flex-col space-y-4 *:[.fas]:shrink *:[.fas]:grow *:[.foo]:shrink *:[.foo]:grow-0",
        className,
      )}
    >
      <div className="foo space-y-2 border-b p-4">
        <p className="font-semibold text-white">{name}</p>

        <div className="typography-sm flex items-center space-x-2 divide-x *:flex *:pr-2">
          <span>{air_date}</span>
          <span>{runtime}</span>
          <TitleScoreBadge
            value={`${vote_average} (${vote_count} ${parseInt(vote_count) > 1 ? "users" : "user"})`}
          />
        </div>
      </div>

      <div className="fas border-b p-4">
        <p
          className={cn(
            !overview &&
              "typography-sm text-muted-foreground/55 leading-6 italic",
          )}
        >
          {overview ||
            "Oops! It looks like the overview for this season isn't available."}
        </p>
      </div>

      <div className="foo p-4">
        <p className="typography-sm">
          Season {season_number}, Episode {episode_number}
        </p>
      </div>
    </Paper>
  );
}

export function SeasonInfo({
  className,
  data,
}: {
  className?: string;
  data: SeasonProps;
}) {
  const {
    air_date,
    episode_count,
    // id,
    name,
    overview,
    season_number,
    vote_average,
  } = data;
  return (
    <Paper
      className={cn(
        "flex flex-col space-y-4 divide-y *:shrink *:[.fas]:grow *:[.foo]:grow-0",
        className,
      )}
    >
      <div className="foo space-y-2 p-4">
        <p className="font-semibold text-white">{name}</p>

        <div className="typography-sm flex items-center space-x-2 divide-x *:flex *:pr-2">
          <span>{air_date}</span>
          <TitleScoreBadge value={vote_average} />
        </div>
      </div>

      <div className="fas p-4">
        <p
          className={cn(
            "fas",
            !overview &&
              "typography-sm text-muted-foreground/55 leading-6 italic",
          )}
        >
          {overview ||
            "Oops! It looks like the overview for this season isn't available."}
        </p>
      </div>

      <div className="foo p-4">
        <p className="typography-sm">
          Season {season_number}, {episode_count}{" "}
          {episode_count > 1 ? "Episodes" : "Episode"}{" "}
        </p>
      </div>
    </Paper>
  );
}
