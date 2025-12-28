import { isApiError } from "@/lib/fetcher";
import { CarouselError } from "./fallback";
import { CarouselBox } from "./carousel-box";
import {
  getOnlyNetflixShows,
  getPopularMovies,
  getPopularShows,
  getPopularStars,
  getUpcomingMovies,
  getUpcomingShows,
} from "./home-api";
import { CarouselItem } from "@/components/ui/carousel";
import { StarProfile, TitlePoster } from "../poster/component";

const classNames =
  "basis-1/2 xl:basis-4/12 3xl:basis-1/4 4xl:basis-1/5 5xl:basis-2/12";

export async function PopularMovies() {
  const data = await getPopularMovies();

  if (isApiError(data)) {
    return (
      <CarouselError
        code={data.status_code as string}
        message={data.status_message}
      />
    );
  }

  return (
    <CarouselBox>
      {data.map((value) => (
        <CarouselItem key={value.id} className={classNames}>
          <TitlePoster data={value} />
        </CarouselItem>
      ))}
    </CarouselBox>
  );
}

export async function PopularShows() {
  const data = await getPopularShows();

  if (isApiError(data)) {
    return (
      <CarouselError
        code={data.status_code as string}
        message={data.status_message}
      />
    );
  }

  return (
    <CarouselBox>
      {data.map((value) => (
        <CarouselItem key={value.id} className={classNames}>
          <TitlePoster data={value} />
        </CarouselItem>
      ))}
    </CarouselBox>
  );
}

export async function UpcomingMovies() {
  const data = await getUpcomingMovies();

  if (isApiError(data)) {
    return (
      <CarouselError
        code={data.status_code as string}
        message={data.status_message}
      />
    );
  }

  return (
    <CarouselBox>
      {data.map((value) => (
        <CarouselItem key={value.id} className={classNames}>
          <TitlePoster data={value} />
        </CarouselItem>
      ))}
    </CarouselBox>
  );
}

export async function UpcomingShows() {
  const data = await getUpcomingShows();

  if (isApiError(data)) {
    return (
      <CarouselError
        code={data.status_code as string}
        message={data.status_message}
      />
    );
  }

  return (
    <CarouselBox>
      {data.map((value) => (
        <CarouselItem key={value.id} className={classNames}>
          <TitlePoster data={value} />
        </CarouselItem>
      ))}
    </CarouselBox>
  );
}

export async function NetflixShows() {
  const data = await getOnlyNetflixShows();

  if (isApiError(data)) {
    return (
      <CarouselError
        code={data.status_code as string}
        message={data.status_message}
      />
    );
  }

  return (
    <CarouselBox>
      {data.map((value) => (
        <CarouselItem key={value.id} className={classNames}>
          <TitlePoster data={value} />
        </CarouselItem>
      ))}
    </CarouselBox>
  );
}

export async function PopularStars() {
  const data = await getPopularStars();

  if (isApiError(data)) {
    return (
      <CarouselError
        code={data.status_code as string}
        message={data.status_message}
      />
    );
  }

  return (
    <CarouselBox>
      {data.map((value) => (
        <CarouselItem
          key={value.id}
          className="basis-1/2 sm:basis-4/12 lg:basis-1/4 2xl:basis-1/5 4xl:basis-2/12"
        >
          <StarProfile data={value} />
        </CarouselItem>
      ))}
    </CarouselBox>
  );
}
