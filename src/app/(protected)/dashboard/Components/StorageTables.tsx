"use client";

import { columns } from "@app/(protected)/dashboard/Components/StorageTableColumns";
import { DataTable } from "@components/Table/DataTable";
import { readAllStoragesAndProductStorages } from "@/app/_actions/storage";
import type { ProductStorageType } from "@utils/types/index";
import { useQuery } from "@tanstack/react-query";
import DashboardLoading from "@app/(protected)/dashboard/Components/DashboardLoading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function StorageTables() {
  const { data: storages, isLoading } = useQuery({
    queryKey: ["storages", "product-storages", "all"],
    queryFn: async () => readAllStoragesAndProductStorages(),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <>
      {isLoading ? (
        <>
          <Card>
            <CardHeader className="flex h-[400px] flex-col gap-1">
              <DashboardLoading />
              <DashboardLoading />
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex h-[400px] flex-col gap-1">
              <DashboardLoading />
              <DashboardLoading />
            </CardHeader>
          </Card>
        </>
      ) : (
        storages &&
        storages?.data &&
        storages?.data?.length > 0 &&
        storages?.data.map((storage, index) => (
          <Card
            key={index}
            className="col-span-1 flex h-fit w-full flex-col xl:col-span-2"
          >
            <CardHeader className="flex flex-row items-center pb-0">
              <div className="grid gap-2">
                <CardTitle>{storage.name}</CardTitle>
                <CardDescription>
                  Hệ thống kho của chi nhánh {storage.province}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-2 h-fit w-full">
              <div className="min-h-[100px] w-full overflow-hidden">
                {storages && storages?.data && storages?.data?.length > 0 && (
                  <DataTable
                    columns={columns}
                    data={
                      storages.data[index]
                        .product_storage as ProductStorageType[]
                    }
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
        ))
      )}
    </>
  );
}
