"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ChartLoading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <Skeleton className="h-1/3 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="h-1/3 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="h-1/3 w-full rounded-lg bg-foreground/10" />
    </div>
  );
}
