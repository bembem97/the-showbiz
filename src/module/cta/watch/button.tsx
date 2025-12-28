import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Button from "@mui/material/Button";
import React from "react";

export default function WatchButton() {
  return (
    <>
      <Button>
        <VisibilityOutlinedIcon />
        Mark as watched
      </Button>
    </>
  );
}
