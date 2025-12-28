import { isApiError } from "@/lib/fetcher";
import {
  getActionAndAdventureShows,
  getAnimatedShows,
  getComedyShows,
  getCrimeShows,
  getDocumentaryShows,
  getDramaShows,
  getKidsAndFamilyShows,
  getMysteryShows,
  getRealityShows,
  getSciFiAndFantasyShows,
  getTalkShows,
} from "./tv-api";
import { CarouselError } from "./fallback";
import { CarouselBox } from "./carousel-box";
import { CarouselItem } from "@/components/ui/carousel";
import { TitlePoster } from "../poster/component";

const classNames =
  "basis-1/2 sm:basis-4/12 lg:basis-1/4 2xl:basis-1/5 4xl:basis-2/12";

export async function ActionAndAdventureShows() {
  const data = await getActionAndAdventureShows();

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

export async function AnimatedShows() {
  const data = await getAnimatedShows();

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

export async function ComedyShows() {
  const data = await getComedyShows();

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

export async function CrimeShows() {
  const data = await getCrimeShows();

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

export async function DocumentaryShows() {
  const data = await getDocumentaryShows();

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

export async function DramaShows() {
  const data = await getDramaShows();

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

export async function KidsAndFamilyShows() {
  const data = await getKidsAndFamilyShows();

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

export async function MysteryShows() {
  const data = await getMysteryShows();

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

export async function RealityShows() {
  const data = await getRealityShows();

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

export async function SciFiAndFantasyShows() {
  const data = await getSciFiAndFantasyShows();

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

export async function TalkShows() {
  const data = await getTalkShows();

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
