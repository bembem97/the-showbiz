import React from "react";
import getKnownFor from "./known-for-api";
import { PosterImage } from "@/components/ui/image";
import { Route } from "next";
import Link from "next/link";
import { isApiError } from "@/lib/fetcher";
import AlertError from "@/components/ui/alert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import TSLink from "@/components/ui/link";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

export default async function KnownFor({ id }: { id: string }) {
  const response = await getKnownFor(id);

  if (isApiError(response)) {
    return (
      <AlertError
        error={response.status_code}
        message={response.status_message}
      />
    );
  }

  return (
    <List className="grid grid-cols-1 divide-y-0 3xl:grid-cols-2 4xl:grid-cols-1 5xl:grid-cols-2 *:[li]:border-0 *:[li]:border-none">
      {response.map(
        ({ id, media_type, poster_path, title, ...prop }, infoIndex) => (
          <ListItem disablePadding key={`${infoIndex + 1}-${id}`}>
            <ListItemButton
              component={TSLink}
              href={`/${media_type}/${id}` as Route}
              // className="pl-0"
            >
              <>
                <ListItemAvatar className="h-max shrink-0 grow-0">
                  <PosterImage
                    src={poster_path}
                    alt={title}
                    width={200}
                    height={300}
                    className="aspect-2/3 w-12 rounded-sm"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={title}
                  slotProps={{
                    primary: {
                      className: "line-clamp-1",
                    },
                  }}
                  secondary={
                    <span className="grid auto-rows-min justify-start">
                      {"character" in prop && prop.character ? (
                        <span className="line-clamp-1 text-sm">
                          {prop.character}
                        </span>
                      ) : null}
                      {"job" in prop && prop.job ? (
                        <span className="line-clamp-1 text-sm">
                          {Array.isArray(prop.job)
                            ? prop.job.join(" | ")
                            : prop.job}
                        </span>
                      ) : null}
                    </span>
                  }
                />
              </>
            </ListItemButton>
          </ListItem>
        ),
      )}
    </List>
  );
}
