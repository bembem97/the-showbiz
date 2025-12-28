import React from "react";
import getStarCredits from "./star-credits-api";
import { isApiError } from "@/lib/fetcher";
import { ActingCreditProps, CrewCreditProps } from "./star-credits-function";
import { Route } from "next";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AlertError from "@/components/ui/alert";
import Accordion from "@mui/material/Accordion";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import TSLink from "@/components/ui/link";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { PosterImage } from "@/components/ui/image";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

interface Props {
  id: string;
  known_for: string;
}

export default async function StarCredits({ id, known_for }: Props) {
  const data = await getStarCredits(id, known_for);

  if (isApiError(data)) {
    return (
      <div className="p-2 4xl:p-4">
        <AlertError error={data.status_code} message={data.status_message} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map(({ data, department }, deptIndex) => (
        <ByDepartment
          key={`${deptIndex}-${department}`}
          department={department}
          data={data}
          index={deptIndex}
        />
      ))}
    </div>
  );
}

function ByDepartment({
  data,
  department,
  index,
}: {
  data:
    | {
        time_period: "upcoming" | "previous";
        info: CrewCreditProps[];
      }[]
    | {
        time_period: "upcoming" | "previous";
        info: ActingCreditProps[];
      }[];
  department: string;
  index: number;
}) {
  return (
    <div key={department}>
      <h3 className="mb-4 w-fit capitalize">{department}</h3>

      <>
        {data.map(({ info, time_period }, i) => (
          <Accordion
            key={`${i + 1}-${time_period}`}
            defaultExpanded={index === 0 && i === 1 ? true : false}
          >
            <AccordionSummary
              className="capitalize"
              expandIcon={<ArrowDropDownIcon />}
            >
              {time_period}
            </AccordionSummary>
            <AccordionDetails className="p-0">
              <ItemList data={info} />
            </AccordionDetails>
          </Accordion>
        ))}
      </>
    </div>
  );
}

function ItemList({ data }: { data: ActingCreditProps[] | CrewCreditProps[] }) {
  if (data.length === 0) {
    return <Alert severity="info">No Credit</Alert>;
  }

  return (
    <List>
      {data.map(
        (
          {
            id,
            media_type,
            poster_path,
            title,
            vote_average,
            year,
            episode_count,
          },
          infoIndex,
        ) => (
          <ListItem disableGutters key={`${infoIndex + 1}-${id}`}>
            <ListItemButton
              href={`/${media_type}/${id}` as Route}
              component={TSLink}
            >
              <>
                <ListItemAvatar className="h-max shrink-0 grow-0">
                  <PosterImage
                    src={poster_path}
                    alt={title}
                    width={200}
                    height={300}
                    className="aspect-2/3 w-12"
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
                    <>
                      <span className="flex items-center gap-x-2">
                        <Chip component="span" label={year} />
                        <Chip component="span" label={vote_average} />
                      </span>
                      {episode_count ? (
                        <span className="text-xs">
                          {episode_count}{" "}
                          {episode_count > 1 ? "Episodes" : "Episode"}
                        </span>
                      ) : null}
                    </>
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
