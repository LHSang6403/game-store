import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function DataCardLoading() {
  return (
    <Card className="flex h-32 w-full flex-col items-center justify-center gap-1 p-3">
      <Skeleton className="h-1/3 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="h-1/3 w-full rounded-lg bg-foreground/10" />
      <Skeleton className="h-1/3 w-full rounded-lg bg-foreground/10" />
    </Card>
  );
}
