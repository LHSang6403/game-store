"use client";

import { readStorages } from "@app/_actions/storage";
import { readAllProductStorages } from "@/app/_actions/product_storage";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import SelectionLists from "./Components/SelectionLists";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function page() {
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

  return (
    <section className="flex flex-col gap-4 pb-4 lg:flex-col sm:pb-2">
      <div className="flex flex-col">
        <h1 className="mt-2 text-2xl font-medium">Nhập thêm sản phẩm</h1>
        <Link
          href="/dashboard/product/create"
          className="flex w-fit flex-row items-center text-sm font-medium text-foreground/90 hover:text-foreground"
        >
          Nhập mới sản phẩm
          <ChevronsRight className="h-4 w-4" />
        </Link>
      </div>
      <div>
        {isStorageLoading || isProductStoragesLoading ? (
          <div className="grid grid-cols-2 gap-2 overflow-hidden lg:grid-cols-1 lg:gap-4">
            <Skeleton className="h-20 w-full rounded-lg bg-foreground/10" />
            <Skeleton className="h-20 w-full rounded-lg bg-foreground/10" />
            <Skeleton className="h-20 w-full rounded-lg bg-foreground/10" />
            <Skeleton className="h-20 w-full rounded-lg bg-foreground/10" />
            <Skeleton className="col-span-2 h-20 w-full rounded-lg bg-foreground/10 lg:col-span-1" />
            <Skeleton className="col-span-2 h-44 w-full rounded-lg bg-foreground/10 lg:col-span-1" />
          </div>
        ) : (
          <>
            {isStorageSuccess &&
              isProductStoragesSuccess &&
              storages.data &&
              productStorages.data && (
                <SelectionLists
                  storages={storages.data}
                  productStorages={productStorages.data}
                />
              )}
          </>
        )}
      </div>
    </section>
  );
}
