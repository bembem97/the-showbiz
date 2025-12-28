import AlertError from "@/components/ui/alert";
import { isApiError } from "@/lib/fetcher";
import { StarProfile } from "@/module/poster/component";
import getStars from "@/module/star/api";
import Pagination from "@/module/star/pagination";
import Paper from "@mui/material/Paper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Celebrities",
};

export default async function Stars({ searchParams }: PageProps<"/stars">) {
  const paramPage = (await searchParams)?.page;
  const page = Number(paramPage) || 1;

  const data = await getStars(page);

  if (isApiError(data)) {
    return (
      <AlertError error={data.status_code} message={data.status_message} />
    );
  }

  const { page: current, results, total_pages } = data;

  return (
    <div className="@container space-y-6 px-2 py-4">
      <div className="grid grid-cols-2 gap-2 @lg:grid-cols-4 @2xl:grid-cols-5 @3xl:gap-4">
        {results.map((value) => (
          <StarProfile key={value.id} data={value} />
        ))}
      </div>

      <Paper className="flex justify-center p-2">
        <Pagination pageCount={total_pages} currentPage={current} />
      </Paper>
    </div>
  );
}
