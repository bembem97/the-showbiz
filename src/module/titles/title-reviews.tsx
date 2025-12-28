import { ApiErrorProps, fetcher, isApiError } from "@/lib/fetcher";
import { API_KEY, API_URL, getNumberCompact } from "@/lib/utils";
import { ReviewApiResponse } from "@/types/title-reviews";
import Link from "next/link";

export type ReviewProps = {
  name: string;
  username: string;
  rating: number | null;
  content: string;
  id: string;
  created_at: string;
};

async function getReviewsApi(id: number, media_type: "movie" | "tv") {
  const response = await fetcher<ReviewApiResponse>(
    `${API_URL}${media_type}/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (isApiError(response)) return response;

  return response;
}

export async function getTotalReview(
  id: number,
  media_type: "movie" | "tv",
): Promise<0 | string> {
  const data = await getReviewsApi(id, media_type);

  if (isApiError(data)) return 0;

  return data.total_results === 0 ? 0 : getNumberCompact(data.total_results);
}

export async function getReviews(
  id: number,
  media_type: "movie" | "tv",
): Promise<ReviewProps[] | ApiErrorProps> {
  const data = await getReviewsApi(id, media_type);

  if (isApiError(data)) return data;

  const result = data.results.map(
    ({
      author_details: { name, rating, username },
      content,
      id,
      created_at,
    }) => ({
      name,
      username,
      rating,
      content,
      id,
      created_at,
    }),
  );

  return result.slice(0, 6);
}

export async function ReviewCount({
  id,
  media_type,
}: {
  id: number;
  media_type: "movie" | "tv";
}) {
  const data = await getTotalReview(id, media_type);

  return (
    <div className="typography-xs flex items-center justify-center">
      <Link href="/" className="inline-block p-2 hover:text-primary">
        {data} User {data === 0 || parseInt(data) === 1 ? "review" : "reviews"}
      </Link>
    </div>
  );
}
