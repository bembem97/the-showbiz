import AlertError from "@/components/ui/alert";
import Skeleton from "@mui/material/Skeleton";

export function CarouselSkeleton() {
  return (
    <div className="p-2">
      <Skeleton variant="rectangular" className="h-72" />
    </div>
  );
}

export function CarouselError({
  code,
  message,
}: {
  code: string;
  message: string;
}) {
  return (
    <div className="p-2">
      <AlertError className="h-72" error={code} message={message} />
    </div>
  );
}
