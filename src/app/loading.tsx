import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mt-16 grid h-auto w-screen grid-cols-4 content-center gap-2 rounded-xl p-10 md:h-screen md:gap-3 md:p-6">
      <Skeleton className="col-span-4 h-[300px] rounded-xl bg-foreground/10 md:h-[250px]" />
      <Skeleton className="col-span-1 h-[60px] rounded-xl bg-foreground/10 md:h-[100px]" />
      <Skeleton className="col-span-3 h-[60px] rounded-xl bg-foreground/10 md:h-[100px]" />
      <Skeleton className="col-span-1 h-[60px] rounded-xl bg-foreground/10 md:h-[100px]" />
      <Skeleton className="col-span-3 h-[60px] rounded-xl bg-foreground/10 md:h-[100px]" />
      <Skeleton className="col-span-4 h-[60px] rounded-xl bg-foreground/10 md:h-[100px]" />
    </div>
  );
}
