"use client";

import CreateForm from "@/app/(protected)/dashboard/order/create/Components/CreateForm";
import { readProductsWithDetail } from "@/app/_actions/product";
import { readCustomers } from "@app/_actions/user";
import { readStorages } from "@app/_actions/storage";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import DashboardColumnsSkeleton from "@/app/(protected)/dashboard/_components/DashboardColumnsSkeleton";

export default function page() {
  const {
    data: products,
    isLoading: isProductLoading,
    isSuccess: isProductSuccess,
  } = useQuery({
    queryKey: ["products-with-details", "all"],
    queryFn: () => readProductsWithDetail(),
    staleTime: 15 * (60 * 1000),
  });

  const {
    data: customers,
    isLoading: isCustomerLoading,
    isSuccess: isCustomerSuccess,
  } = useQuery({
    queryKey: ["customers", "all"],
    queryFn: () => readCustomers({ limit: 200, offset: 0 }),
    staleTime: 15 * (60 * 1000),
  });

  const {
    data: storages,
    isLoading: isStorageLoading,
    isSuccess: isStorageSuccess,
  } = useQuery({
    queryKey: ["storages", "all"],
    queryFn: () => readStorages(),
    staleTime: 15 * (60 * 1000),
  });

  const shouldRenderForm = useMemo(() => {
    return (
      isProductSuccess &&
      isCustomerSuccess &&
      isStorageSuccess &&
      customers?.data &&
      products?.data &&
      storages?.data
    );
  }, [
    isProductSuccess,
    isCustomerSuccess,
    isStorageSuccess,
    customers,
    products,
    storages,
  ]);

  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-2">
      <h1 className="my-2 text-2xl font-medium">Tạo đơn hàng</h1>
      <div className="h-fit w-full">
        {isProductLoading || isCustomerLoading || isStorageLoading ? (
          <DashboardColumnsSkeleton />
        ) : (
          <>
            {shouldRenderForm && (
              <CreateForm
                storages={storages?.data ?? []}
                customers={customers?.data ?? []}
                products={products?.data ?? []}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
