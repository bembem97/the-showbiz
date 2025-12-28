import { isApiError } from "@/lib/fetcher";
import { getSimilarTitles } from "./title-similar-api";
import { CarouselError } from "../carousel/fallback";
import Alert from "@mui/material/Alert";
import { CarouselBox } from "../carousel/carousel-box";
import { CarouselItem } from "@/components/ui/carousel";
import { TitlePoster } from "../poster/component";
import { getReviews } from "./title-reviews";
import Paper from "@mui/material/Paper";
import { TitleScoreBadge } from "@/components/ui/data-display";
import { getPrettyDate } from "@/lib/utils";
import { SeasonProps } from "./title-detail-types";
import { SeasonInfo } from "./title-detail-component";

export async function SimilarTitles({
  id,
  media_type,
}: {
  id: number;
  media_type: "movie" | "tv";
}) {
  const data = await getSimilarTitles(id, media_type);

  if (isApiError(data)) {
    return (
      <CarouselError
        code={data.status_code as string}
        message={data.status_message}
      />
    );
  }

  if (data.length < 1) {
    return (
      <Alert>
        <>No data to display at this time. Please try again later.</>
      </Alert>
    );
  }

  return (
    <CarouselBox className="**:data-[slot=carousel-viewport]:p-0">
      {data.map((value) => (
        <CarouselItem
          key={value.id}
          className="basis-1/2 sm:basis-4/12 lg:basis-1/4 2xl:basis-1/5 4xl:basis-2/12"
        >
          <TitlePoster data={value} />
        </CarouselItem>
      ))}
    </CarouselBox>
  );
}

export async function TitleReviews({
  id,
  media_type,
}: {
  id: number;
  media_type: "movie" | "tv";
}) {
  const data = await getReviews(id, media_type);

  if (isApiError(data)) {
    return (
      <CarouselError
        code={data.status_code as string}
        message={data.status_message}
      />
    );
  }

  if (data.length < 1) {
    return (
      <Alert>
        <>
          This {media_type === "movie" ? "film" : "show"} {"doesn't"} have a
          review yet. Be the first to say something.
        </>
      </Alert>
    );
  }

  return (
    <>
      <CarouselBox className="**:data-[slot=carousel-viewport]:p-0">
        {data.map(({ name, content, id, rating, created_at, username }) => (
          <CarouselItem
            key={id}
            className="grid w-full basis-auto [--w:calc(1/2*100%-0.625rem)] @lg:w-(--w)"
          >
            <Paper
              className="grid grid-rows-[max-content_1fr] divide-y"
              key={id}
            >
              <div className="flex gap-x-2 p-4">
                <div className="grid shrink grow auto-rows-min gap-y-1">
                  <span className="typography-h4">
                    {name || `User-${username}`}
                  </span>
                  <span className="typography-xs">@{username}</span>
                </div>

                <div className="flex items-center justify-end">
                  <TitleScoreBadge value={rating || 0} />
                </div>
              </div>

              <div className="flex flex-col space-y-4 py-4">
                <div className="shrink grow px-4">
                  <p className="line-clamp-6">{content}</p>
                </div>
                <hr />
                <div className="px-4">
                  <time
                    className="typography-xs"
                    dateTime={getPrettyDate(created_at, { style: "long" })!}
                  >
                    {getPrettyDate(created_at, { style: "long" })}
                  </time>
                </div>
              </div>
            </Paper>
          </CarouselItem>
        ))}
      </CarouselBox>
    </>
  );
}

export function Seasons({ data }: { data: SeasonProps[] }) {
  if (data.length < 1) {
    return (
      <Alert>
        <>No data to display at this time. Please try again later.</>
      </Alert>
    );
  }

  return (
    <CarouselBox
      opts={{ align: "start" }}
      className="**:data-[slot=carousel-viewport]:p-0"
    >
      {data.map((value) => (
        <div className="grid w-full shrink-0 grow-0 @xl:w-8/10" key={value.id}>
          <SeasonInfo data={value} />
        </div>
      ))}
    </CarouselBox>
  );
}
