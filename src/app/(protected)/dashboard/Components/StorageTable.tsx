"use client";

import { columns } from "./StorageTableColumns";
import { DataTable } from "@components/Table/DataTable";
import { readStorage } from "@/app/_actions/storage";
import type { StorageType } from "@utils/types/index";
import { useQuery } from "@tanstack/react-query";
import ChartLoading from "@app/(protected)/dashboard/Components/ChartLoading";

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
    <div className="w-full">
      {isLoading ? (
        <div className="h-[400px]">
          <ChartLoading />
        </div>
      ) : (
        <div className="min-h-[100px] w-full overflow-hidden">
          <DataTable
            columns={columns}
            data={storage as StorageType[]}
            isPaginationEnabled={true}
            isCollumnVisibilityEnabled={false}
            isSearchEnabled={false}
            isBorder={false}
            isSeparator={false}
          />
        </div>
      )}
    </div>
  );
}
