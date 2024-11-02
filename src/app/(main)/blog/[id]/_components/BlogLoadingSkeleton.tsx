import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mt-4 grid h-fit w-full grid-cols-4 content-center gap-3 rounded-xl p-10 lg:p-6 sm:mt-0 sm:h-auto sm:gap-2 sm:p-4">
      <Skeleton className="col-span-1 h-20 rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-3 h-20 rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-1 h-20 rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-3 h-20 rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-1 h-20 rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-3 h-20 rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-4 h-56 rounded-xl bg-foreground/10" />
    </div>
  );
}
