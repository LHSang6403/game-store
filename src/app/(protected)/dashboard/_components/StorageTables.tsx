"use client";

import { columns } from "@/app/(protected)/dashboard/_components/StorageTableColumns";
import { DataTable } from "@components/Table/DataTable";
import { readAllStoragesAndProductStorages } from "@/app/_actions/storage";
import type { ProductStorageType } from "@utils/types/index";
import { useQuery } from "@tanstack/react-query";
import DashboardLoading from "@/app/(protected)/dashboard/_components/DashboardLoading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo, useCallback } from "react";

export default function StorageTables() {
  const { data: storages, isLoading } = useQuery({
    queryKey: ["storages", "product-storages", "all"],
    queryFn: async () => readAllStoragesAndProductStorages(),
    staleTime: 1000 * 60 * 60,
  });

  const memoizedStorages = useMemo(
    () => storages?.data || [],
    [storages?.data]
  );

  const renderStorageCard = useCallback(
    (storage, index) => (
      <Card
        key={index}
        className="col-span-2 flex h-fit w-full flex-col md:col-span-1"
      >
        <CardHeader className="flex flex-row items-center pb-0">
          <div className="grid gap-2">
            <CardTitle className="font-semibold">{storage.name}</CardTitle>
            <CardDescription>
              Hệ thống kho của chi nhánh {storage.province}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="mt-2 h-full w-full">
          <div className="flex h-full w-full flex-col justify-between overflow-hidden md:h-[450px]">
            {storage.product_storage?.length > 0 && (
              <DataTable
                columns={columns}
                data={storage.product_storage as ProductStorageType[]}
                defaultPageSize={5}
                isPaginationEnabled={true}
                isCollumnVisibilityEnabled={false}
                isSearchEnabled={false}
                isBorder={false}
                isSeparator={false}
              />
            )}
          </div>
        </CardContent>
      </Card>
    ),
    []
  );

  return (
    <>
      {isLoading ? (
        <>
          <Card className="col-span-2 md:col-span-1">
            <CardHeader className="flex h-[400px] flex-col gap-1">
              <DashboardLoading />
              <DashboardLoading />
            </CardHeader>
          </Card>
          <Card className="col-span-2 md:col-span-1">
            <CardHeader className="flex h-[400px] flex-col gap-1">
              <DashboardLoading />
              <DashboardLoading />
            </CardHeader>
          </Card>
        </>
      ) : (
        memoizedStorages.length > 0 &&
        memoizedStorages.map((storage, index) =>
          renderStorageCard(storage, index)
        )
      )}
    </>
  );
}
