import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid h-screen w-screen grid-cols-4 content-center gap-3 rounded-xl p-10 lg:p-6 sm:mt-12 sm:h-auto">
      <Skeleton className="col-span-4 h-[250px] rounded-xl bg-foreground/10 sm:h-[300px]" />
      <Skeleton className="col-span-1 h-[100px] rounded-xl bg-foreground/10 sm:h-[60px]" />
      <Skeleton className="col-span-3 h-[100px] rounded-xl bg-foreground/10 sm:h-[60px]" />
      <Skeleton className="col-span-1 h-[100px] rounded-xl bg-foreground/10 sm:h-[60px]" />
      <Skeleton className="col-span-3 h-[100px] rounded-xl bg-foreground/10 sm:h-[60px]" />
      <Skeleton className="col-span-4 h-[100px] rounded-xl bg-foreground/10 sm:h-[60px]" />
    </div>
  );
}
