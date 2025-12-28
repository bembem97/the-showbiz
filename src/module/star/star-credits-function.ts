import { getImagePath } from "@/lib/utils";
import {
  CombinedCreditsApiResponse,
  MovieCrewCreditProps,
  TvCrewCreditProps,
} from "@/types/combined-credits";

type CreditListProps = Omit<CombinedCreditsApiResponse, "id">;

interface CreditProps {
  id: number;
  title: string;
  year: number | string;
  media_type: "movie" | "tv";
  vote_average: number;
  poster_path: string;
  episode_count?: number;
}

export interface ActingCreditProps extends CreditProps {
  character?: string; //todo: For acting
}

export interface CrewCreditProps extends CreditProps {
  job?: string; //todo: For crew
}

export interface NewActingCreditProps {
  department: string;
  data: {
    time_period: "upcoming" | "previous";
    info: ActingCreditProps[];
  }[];
}

export interface NewCrewCreditProps {
  department: string;
  data: {
    time_period: "upcoming" | "previous";
    info: CrewCreditProps[];
  }[];
}

export default function starCreditProperties(
  data: CreditListProps,
  known_for: string,
) {
  const new_credits = [];

  //todo: Process cast data
  const actingData: NewActingCreditProps = {
    department: "acting",
    data: [
      { time_period: "upcoming", info: [] },
      { time_period: "previous", info: [] },
    ],
  };

  data.cast.forEach(
    ({ id, media_type, poster_path, vote_average, character, ...item }) => {
      const year =
        "release_date" in item && item.release_date
          ? new Date(item.release_date).getFullYear()
          : "first_air_date" in item && item.first_air_date
            ? new Date(item.first_air_date).getFullYear()
            : "";

      const timePeriod = year ? "previous" : "upcoming";

      const formattedItem = {
        id,
        title:
          "title" in item && item.title
            ? item.title
            : "name" in item && item.name
              ? item.name
              : "", //todo: Handle both movie and TV titles
        character,
        year: year,
        vote_average: parseFloat(vote_average.toFixed(1)),
        media_type,
        poster_path: getImagePath(poster_path),
        ...("episode_count" in item && { episode_count: item.episode_count }),
      };

      actingData.data[timePeriod === "previous" ? 1 : 0].info.push(
        formattedItem,
      );
    },
  );

  new_credits.push(actingData);

  //todo: Process crew data
  const crewByDepartment: {
    [department: string]: (TvCrewCreditProps | MovieCrewCreditProps)[];
  } = {};

  data.crew.forEach((item) => {
    if (!crewByDepartment[item.department]) {
      crewByDepartment[item.department] = [];
    }

    crewByDepartment[item.department].push(item);
  });

  for (const department in crewByDepartment) {
    const departmentData: NewCrewCreditProps = {
      department: department.toLowerCase(), //todo: Lowercase department
      data: [],
    };

    const items = crewByDepartment[department];

    const upcoming: {
      time_period: "upcoming";
      info: CrewCreditProps[];
    } = {
      time_period: "upcoming",
      info: [],
    };

    const previous: {
      time_period: "previous";
      info: CrewCreditProps[];
    } = {
      time_period: "previous",
      info: [],
    };

    items.forEach(({ id, media_type, vote_average, poster_path, ...item }) => {
      const year =
        "release_date" in item && item.release_date
          ? new Date(item.release_date).getFullYear()
          : "first_air_date" in item && item.first_air_date
            ? new Date(item.first_air_date).getFullYear()
            : "";

      const timePeriod = year ? "previous" : "upcoming";

      const formattedItem = {
        id,
        title:
          "title" in item && item.title
            ? item.title
            : "name" in item && item.name
              ? item.name
              : "",
        year: year,
        job: item.job,
        media_type,
        vote_average: parseFloat(vote_average.toFixed(1)),
        poster_path: getImagePath(poster_path) as string,
        ...("episode_count" in item && { episode_count: item.episode_count }),
      };

      if (timePeriod === "previous") {
        previous.info.push(formattedItem);
      } else {
        upcoming.info.push(formattedItem);
      }
    });
    if (upcoming.info.length > 0) departmentData.data.push(upcoming);
    if (previous.info.length > 0) departmentData.data.push(previous);
    new_credits.push(departmentData);
  }

  new_credits.forEach((department) => {
    if (department.data) {
      //todo: Check if 'data' exists (it might not for some departments)
      department.data.forEach((timePeriod) => {
        timePeriod.info.sort((a, b) => {
          const yearA = a.year === "" ? -1 : Number(a.year); //todo Treat empty year as oldest
          const yearB = b.year === "" ? -1 : Number(b.year);
          return yearB - yearA; //todo: Descending order
        });
      });
    }
  });

  return new_credits.sort((a, b) => {
    if (a.department === known_for) return -1; // a goes before b
    if (b.department === known_for) return 1; // b goes before a
    return 0; // keep current order
  });
}
