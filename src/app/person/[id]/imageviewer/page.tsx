import AlertError from "@/components/ui/alert";
import { fetcher, isApiError } from "@/lib/fetcher";
import { API_KEY, API_URL, getImagePath } from "@/lib/utils";
import { StarDetailsProps } from "@/module/star/star-detail-types";
import getStarDetails from "@/module/star/star-details-api";
import { ProfileProps } from "@/types/star-profile-image";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import PosterPicture from "@/components/ui/image";
import { Route } from "next";

interface CelebProps extends StarDetailsProps {
  images: {
    profiles: ProfileProps[];
  };
}

export async function generateMetadata({
  params,
}: PageProps<"/person/[id]/imageviewer">) {
  const id = (await params).id;
  const data = await getStarDetails(id);

  if (isApiError(data)) {
    return {
      title: data.status_message,
    };
  }

  return {
    title: data.name,
  };
}

export default async function PersonImageViewer({
  params,
}: PageProps<"/person/[id]/imageviewer">) {
  const { id } = await params;
  const response = await fetcher<CelebProps>(
    `${API_URL}person/${id}?api_key=${API_KEY}&append_to_response=images&language=en-US`,
  );

  if (isApiError(response)) {
    return (
      <div className="p-2 4xl:p-4">
        <AlertError
          error={response.status_code}
          message={response.status_message}
        />
      </div>
    );
  }

  const { name, images } = response;

  return (
    <>
      <div className="scanlines relative mb-4 p-2 4xl:p-4">
        <Link
          href={`/person/${id}` as Route}
          className="flex w-max items-center gap-x-2 transition-colors typography-h4 hover:text-primary"
        >
          <ArrowBackIcon />
          Return
        </Link>
        <h1>{name}</h1>
      </div>

      <div className="grid-flexible p-2 [--grid-max-col-count:5] [--grid-min-col-size:12rem] 4xl:p-4">
        {images.profiles.map(({ file_path }, i) => (
          <PosterPicture
            key={i}
            href={`/person/${id}/imageviewer${file_path}` as Route}
            alt={name}
            src={getImagePath(file_path, "poster")}
            className="aspect-2/3"
          />
        ))}
      </div>
    </>
  );
}
