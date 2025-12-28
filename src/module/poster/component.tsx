import PosterPicture from "@/components/ui/image";
import { PosterProps, StarProps } from "./func";
import Chip from "@mui/material/Chip";

interface TitleProps extends React.ComponentProps<"figure"> {
  data: PosterProps;
}

interface ProfileProps extends React.ComponentProps<"figure"> {
  data: StarProps;
}

export function TitlePoster({ data, ...rest }: TitleProps) {
  const { id, media_type, poster_path, rating, title, year } = data;

  return (
    <figure {...rest}>
      <PosterPicture
        src={poster_path}
        alt={title}
        href={`/${media_type}/${id}`}
        className="aspect-2/3"
      />
      <figcaption className="mt-1 space-y-1.5 px-1">
        <p className="line-clamp-1 text-sm">{title}</p>
        <div className="flex items-center gap-x-2">
          <Chip label={rating} />
          <Chip label={year} />
        </div>
      </figcaption>
    </figure>
  );
}

export function StarProfile({ data, ...rest }: ProfileProps) {
  const { id, known_for_department, name, profile_path } = data;

  return (
    <figure {...rest}>
      <PosterPicture
        href={`/person/${id}`}
        alt={name}
        src={profile_path}
        className="aspect-square rounded-full"
      />
      <figcaption className="mt-1 flex flex-col items-center px-1">
        <p className="text-center">{name}</p>
        <span className="text-sm font-light">{known_for_department}</span>
      </figcaption>
    </figure>
  );
}
