"use client";

import SoldBarChart from "@/app/(protected)/dashboard/Components/Charts/SoldBarChart";
import StorageTables from "@/app/(protected)/dashboard/Components/StorageTables";
import { Activity, PackageSearch, UsersRound, Container } from "lucide-react";
import DataCard from "@/app/(protected)/dashboard/Components/DataCard";
import { useQuery } from "@tanstack/react-query";
import { readAllProductStorages } from "@/app/_actions/product_storage";
import { readCustomers, readStaffs } from "@app/_actions/user";
import { useMemo } from "react";

export default function page() {
  const { data: productStorages, isLoading: isProductStoragesLoading } =
    useQuery({
      queryKey: ["product-storages", "all"],
      queryFn: () => readAllProductStorages(),
      staleTime: 60 * (60 * 1000),
    });

  const { data: customers, isLoading: isCustomersLoading } = useQuery({
    queryKey: ["customers", "all"],
    queryFn: () => readCustomers({ limit: 200, offset: 0 }),
    staleTime: 60 * (60 * 1000),
  });

  const { data: staffs, isLoading: isStaffsLoading } = useQuery({
    queryKey: ["staffs", "all"],
    queryFn: () => readStaffs({ limit: 100, offset: 0 }),
    staleTime: 60 * (60 * 1000),
  });

  const totalQuantity = useMemo(() => {
    return productStorages?.data?.reduce(
      (total, current) => total + current.quantity,
      0
    );
  }, [productStorages]);

  return (
    <main className="flex w-full flex-col gap-4 pb-4 pt-2 sm:gap-2 sm:py-0">
      <div className="flex w-full flex-row gap-4 xl:flex-col sm:gap-2">
        <div className="flex w-1/2 flex-col gap-4 xl:w-full sm:gap-2">
          <div className="flex w-full flex-row gap-4 sm:flex-col sm:gap-2">
            <DataCard
              title="Tổng"
              data={(totalQuantity?.toString() ?? "0") + " sản phẩm"}
              previousData="Tổng sản phẩm hiện có"
              icon={<PackageSearch className="text-muted-foreground h-4 w-4" />}
              isLoading={isProductStoragesLoading}
            />
            <DataCard
              title="Phân loại"
              data={(productStorages?.data?.length.toString() ?? "0") + " loại"}
              previousData="Các loại sản phẩm hiện tại"
              icon={<Container className="text-muted-foreground h-4 w-4" />}
              isLoading={isProductStoragesLoading}
            />
          </div>
          <div className="flex w-full flex-row gap-4 sm:flex-col sm:gap-2">
            <DataCard
              title="Khách hàng"
              data={(customers?.data?.length.toString() ?? "0") + " người dùng"}
              previousData="Số lượng tài khoản người dùng hiện tại"
              icon={<Activity className="text-muted-foreground h-4 w-4" />}
              isLoading={isCustomersLoading}
            />
            <DataCard
              title="Nhân viên"
              data={(staffs?.data?.length.toString() ?? "0") + " nhân viên"}
              previousData="Số lượng nhân viên toàn quốc hiện tại"
              icon={<UsersRound className="text-muted-foreground h-4 w-4" />}
              isLoading={isStaffsLoading}
            />
          </div>
        </div>
        <div className="w-1/2 xl:w-full">
          <SoldBarChart />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-2">
        <StorageTables />
      </div>
    </main>
  );
}
