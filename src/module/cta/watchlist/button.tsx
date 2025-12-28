import Button from "@mui/material/Button";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import React from "react";

export default function WatchlistButton() {
  return (
    <>
      <Button>
        <BookmarkBorderOutlinedIcon />
        Add to Watchlist
      </Button>
    </>
  );
}
