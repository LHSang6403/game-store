import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mt-0 grid h-auto w-full grid-cols-4 content-center gap-2 rounded-xl p-4 p-6 md:mt-4 md:h-fit md:gap-3 md:p-10">
      <Skeleton className="col-span-4 h-20 rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-4 h-20 rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-1 h-20 rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-3 h-20 rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-1 h-20 rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-3 h-20 rounded-xl bg-foreground/10" />
      <Skeleton className="col-span-4 h-52 rounded-xl bg-foreground/10" />
    </div>
  );
}
