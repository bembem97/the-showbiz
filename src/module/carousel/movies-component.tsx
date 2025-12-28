import { isApiError } from "@/lib/fetcher";
import {
  getActionMovies,
  getAnimatedAdventureMovies,
  getComedyMovies,
  getFamilyMovies,
  getFantasyMovies,
  getHorrorMovies,
  getMysteryMovies,
  getSciFiMovies,
  getThrillerMovies,
  getWesternMovies,
} from "./movies-api";
import { CarouselError } from "./fallback";
import { CarouselBox } from "./carousel-box";
import { CarouselItem } from "@/components/ui/carousel";
import { TitlePoster } from "../poster/component";

const classNames =
  "basis-1/2 sm:basis-4/12 lg:basis-1/4 2xl:basis-1/5 4xl:basis-2/12";

export async function ActionMovies() {
  const data = await getActionMovies();

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

export async function AnimatedAdventureMovies() {
  const data = await getAnimatedAdventureMovies();

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

export async function ComedyMovies() {
  const data = await getComedyMovies();

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

export async function FamilyMovies() {
  const data = await getFamilyMovies();

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

export async function FantasyMovies() {
  const data = await getFantasyMovies();

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

export async function HorrorMovies() {
  const data = await getHorrorMovies();

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

export async function MysteryMovies() {
  const data = await getMysteryMovies();

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

export async function SciFiMovies() {
  const data = await getSciFiMovies();

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

export async function ThrillerMovies() {
  const data = await getThrillerMovies();

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

export async function WesternMovies() {
  const data = await getWesternMovies();

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
