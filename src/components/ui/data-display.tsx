import Chip from "@mui/material/Chip";
import StarIcon from "@mui/icons-material/Star";
import { cn } from "@/lib/utils";
import Button from "@mui/material/Button";
import { Popper, PopperPanel } from "./popper";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";

interface TitleScoreBadgeProps extends React.ComponentProps<typeof Chip> {
  value: number | string;
}

interface TitleScoreProps extends React.ComponentProps<"div"> {
  vote_average: number;
  vote_count: string;
}

export function TitleScoreBadge({ value, ...rest }: TitleScoreBadgeProps) {
  return <Chip icon={<StarIcon />} label={value} {...rest} />;
}

export function TitleScore({
  className,
  vote_average,
  vote_count,
  ...props
}: TitleScoreProps) {
  return (
    <div
      data-slot="title-score"
      className={cn("flex items-center", className)}
      {...props}
    >
      <div className="drop-shadow-sm drop-shadow-black/50">
        <StarIcon className="size-12 fill-primary stroke-primary" />
      </div>

      <div className="grid auto-rows-min items-center justify-items-center">
        <span className="text-xl leading-5 text-white">{vote_average}</span>
        <p className="text-xs leading-4">
          {vote_count} {parseFloat(vote_count) > 1 ? "votes" : "vote"}
        </p>
      </div>
    </div>
  );
}

export function TitleRate(props: React.ComponentProps<typeof Button>) {
  return (
    <Popper>
      <Button data-popper-button {...props}>
        Rate Now
      </Button>

      <PopperPanel>
        <Paper className="grid place-items-center p-4">
          <Rating max={10} size="large" className="**:[svg]:text-2xl" />
        </Paper>
      </PopperPanel>
    </Popper>
  );
}

// ===================== DATA LIST ============================
export function DataList({ className, ...props }: React.ComponentProps<"dl">) {
  return <dl data-slot="datalist" className={cn(className)} {...props} />;
}

export function DataTerm({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="datalist-term"
      className={cn("text-xs font-bold tracking-wide", className)}
      {...props}
    />
  );
}

export function DataDescription({
  className,
  ...props
}: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="datalist-description"
      className={cn("text-sm font-light text-white", className)}
      {...props}
    />
  );
}
