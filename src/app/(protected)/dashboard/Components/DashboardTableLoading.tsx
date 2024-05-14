import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardTableLoading() {
  return (
    <div className="grid h-fit w-full grid-cols-4 gap-2">
      <Skeleton className="col-span-3 h-10 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="col-span-1 h-10 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="col-span-3 h-20 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="col-span-1 h-20 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="col-span-3 h-20 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="col-span-1 row-span-2 h-full w-full rounded-lg bg-foreground/10" />
      <Skeleton className="col-span-3 h-20 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="col-span-4 h-36 w-full rounded-lg bg-foreground/10" />
    </div>
  );
}
