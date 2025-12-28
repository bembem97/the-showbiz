import { getImagePath } from "@/lib/utils";
import { CastCreditProps, CrewCreditProps } from "@/types/combined-credits";
import { KnownForProps } from "./star-detail-types";

export default function knownForFilter(
  data: (CastCreditProps | CrewCreditProps)[],
): KnownForProps[] {
  const newArray = data
    .filter(
      (item) =>
        ("job" in item &&
          (item.job.toLowerCase() === "director" ||
            item.job.toLowerCase() === "producer" ||
            item.job.toLowerCase() === "writer")) ||
        item,
    )
    .sort((a, b) => {
      //todo: Sort by vote_count descending
      const voteCountComparison = b.vote_count - a.vote_count;
      if (voteCountComparison !== 0) {
        return voteCountComparison;
      }

      //todo: If vote_count is equal, sort by order ascending
      const orderA = (a as { order: number }).order ?? Infinity;
      const orderB = (b as { order: number }).order ?? Infinity;
      //// const orderA = a.type === "movie" ? a.order : Infinity;
      //// const orderB = b.type === "movie" ? b.order : Infinity;
      return orderA - orderB;
    });

  const arrayReduce = newArray.reduce(
    (acc: Record<string, KnownForProps>, cur) => {
      //// const year =
      ////   "release_date" in cur
      ////     /? new Date(cur.release_date).getFullYear()
      ////     : new Date(cur.first_air_date).getFullYear();
      const title = "title" in cur ? cur.title : cur.name;
      const job = "job" in cur ? cur.job : undefined;
      const character = "character" in cur ? cur.character : undefined;

      const { id, media_type, poster_path } = cur;

      if (!acc[title]) {
        acc[title] = {
          ...(character ? { character } : null),
          ...(job ? { job: [] } : null),
          id,
          media_type,
          poster_path: getImagePath(poster_path) as string,
          title,
          //// vote_average: parseFloat(vote_average.toFixed(1)),
          //// year,
        };
      }

      if ("job" in acc[title] && acc[title].job !== undefined && job) {
        acc[title].job.push(job);
      }

      return acc;
    },
    {},
  );

  const newData = Object.values(arrayReduce);

  return newData;
}
