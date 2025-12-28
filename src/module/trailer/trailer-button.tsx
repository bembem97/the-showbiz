import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Button from "@mui/material/Button";
import TSLink from "@/components/ui/link";

interface Props {
  data: {
    id: string;
    key: string;
    name: string;
  };
  media_type: "movie" | "tv";
  id: number;
}

export default function TrailerButton({ data, id, media_type }: Props) {
  return (
    <Button component={TSLink} href={`/${media_type}/${id}/video/${data.key}`}>
      <PlayArrowIcon />
      Trailer
    </Button>
  );
}
