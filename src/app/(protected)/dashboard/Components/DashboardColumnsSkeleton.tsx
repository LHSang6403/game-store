import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardColumnsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2 overflow-hidden lg:grid-cols-1 lg:gap-4">
      <Skeleton className="h-20 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="h-20 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="h-20 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="h-20 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="col-span-2 h-20 w-full rounded-lg bg-foreground/10 lg:col-span-1" />
      <Skeleton className="col-span-2 h-44 w-full rounded-lg bg-foreground/10 lg:col-span-1" />
    </div>
  );
}
