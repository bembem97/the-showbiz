"use client";

import * as React from "react";
import MuiPagination from "@mui/material/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";

type Props = {
  pageCount: number;
  currentPage: number;
};

export default function Pagination({ currentPage, pageCount }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    router.replace(`${pathname}?${params.toString()}` as Route);
  };

  return (
    <MuiPagination
      count={pageCount}
      page={currentPage}
      onChange={handlePageChange}
      variant="outlined"
      shape="rounded"
      size="small"
    />
  );
}
