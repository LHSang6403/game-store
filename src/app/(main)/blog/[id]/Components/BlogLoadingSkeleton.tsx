import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mt-4 grid h-fit w-full grid-cols-4 content-center gap-3 rounded-xl p-10 lg:p-6 sm:mt-24 sm:h-auto sm:gap-2">
      <Skeleton className="col-span-1 h-[100px] rounded-xl bg-foreground/10 sm:h-[300px]" />
      <Skeleton className="col-span-3 h-[100px] rounded-xl bg-foreground/10 sm:h-[300px]" />
      <Skeleton className="col-span-1 h-[100px] rounded-xl bg-foreground/10 sm:h-[60px]" />
      <Skeleton className="col-span-3 h-[100px] rounded-xl bg-foreground/10 sm:h-[60px]" />
      <Skeleton className="col-span-1 h-[100px] rounded-xl bg-foreground/10 sm:h-[60px]" />
      <Skeleton className="col-span-3 h-[100px] rounded-xl bg-foreground/10 sm:h-[60px]" />
      <Skeleton className="col-span-4 h-[350px] rounded-xl bg-foreground/10 sm:h-[300px]" />
    </div>
  );
}
