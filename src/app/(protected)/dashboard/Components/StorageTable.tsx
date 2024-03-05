"use client";

import { columns } from "./StorageTableColumns";
import { DataTable } from "@components/Table/DataTable";
import { readStorage } from "@/app/_actions/storage";
import type { StorageType } from "@utils/types/index";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default async function OrderHistory() {
  const limit = 20;
  const offset = 0;

  const { data: storageResponse, isLoading } = useQuery({
    queryKey: ["storage", limit, offset],
    queryFn: async () => readStorage({ limit: limit, offset: offset }),
    staleTime: 1000 * 60 * 60,
  });

  const storage = storageResponse?.data as StorageType[];

  return (
    <div className="h-fit min-h-[100px] w-full overflow-hidden">
      {isLoading ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <Skeleton className="h-full w-full rounded-xl bg-foreground/10" />
          <Skeleton className="h-full w-full rounded-xl bg-foreground/10" />
          <Skeleton className="h-full w-full rounded-xl bg-foreground/10" />
        </div>
      ) : (
        <div className="w-full">
          <h2 className="mb-1 text-lg font-semibold">Availble Storage</h2>
          <DataTable
            columns={columns}
            data={storage as StorageType[]}
            isPaginationEnabled={false}
            isCollumnVisibilityEnabled={false}
            isSearchEnabled={false}
          />
        </div>
      )}
    </div>
  );
}
