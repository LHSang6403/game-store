import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardColumnsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-2 overflow-hidden md:grid-cols-2 md:gap-3">
      <Skeleton className="h-20 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="h-20 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="h-20 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="h-20 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="col-span-1 h-20 w-full rounded-lg bg-foreground/10 md:col-span-2" />
      <Skeleton className="col-span-1 h-44 w-full rounded-lg bg-foreground/10 md:col-span-2" />
    </div>
  );
}
