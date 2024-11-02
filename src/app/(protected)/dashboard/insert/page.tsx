"use client";

import { readStorages } from "@app/_actions/storage";
import { readAllProductStorages } from "@/app/_actions/product_storage";
import { ChevronsRight } from "lucide-react";
import SelectionLists from "./_components/SelectionLists";
import { useQuery } from "@tanstack/react-query";
import DashboardColumnsSkeleton from "@/app/(protected)/dashboard/_components/DashboardColumnsSkeleton";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function page() {
  const router = useRouter();

  const {
    data: storages,
    isLoading: isStorageLoading,
    isSuccess: isStorageSuccess,
  } = useQuery({
    queryKey: ["storages", "all"],
    queryFn: () => readStorages(),
    staleTime: 15 * (60 * 1000),
  });

  const {
    data: productStorages,
    isLoading: isProductStoragesLoading,
    isSuccess: isProductStoragesSuccess,
  } = useQuery({
    queryKey: ["product-storages", "all"],
    queryFn: () => readAllProductStorages(),
    staleTime: 15 * (60 * 1000),
  });

  const isDataReady = useMemo(
    () =>
      isStorageSuccess &&
      isProductStoragesSuccess &&
      storages?.data &&
      productStorages?.data,
    [isStorageSuccess, isProductStoragesSuccess, storages, productStorages]
  );

  return (
    <section className="flex flex-col gap-4 pb-4 lg:flex-col sm:pb-2">
      <div className="flex flex-col">
        <h1 className="mt-2 text-2xl font-medium">Nhập thêm sản phẩm</h1>
        <button
          onClick={() => router.push("/dashboard/product/create")}
          className="flex w-fit flex-row items-center text-sm font-medium text-foreground/90 hover:text-foreground"
        >
          Nhập mới sản phẩm
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
      <div>
        {isStorageLoading || isProductStoragesLoading ? (
          <DashboardColumnsSkeleton />
        ) : (
          <>
            {isDataReady && (
              <SelectionLists
                storages={storages?.data ?? []}
                productStorages={productStorages?.data ?? []}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
