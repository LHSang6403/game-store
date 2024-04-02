"use client";

import SoldBarChart from "@/app/(protected)/dashboard/Components/Charts/SoldBarChart";
import StorageTables from "@/app/(protected)/dashboard/Components/StorageTables";
import { Activity, PackageSearch, UsersRound, Container } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataCard from "@/app/(protected)/dashboard/Components/DataCard";
import { useQuery } from "@tanstack/react-query";
import { readAllProductStorages } from "@/app/_actions/product_storage";
import useDatePicker from "@/zustand/useDatePicker";
import { readCustomers, readStaffs } from "@app/_actions/user";

export default function Dashboard() {
  const { data: productStorages, isLoading: isProductStoragesLoading } =
    useQuery({
      queryKey: ["product-storage", "all"],
      queryFn: () => readAllProductStorages(),
      staleTime: 1000 * 60 * 60,
    });

  const { data: customers, isLoading: isCustomersLoading } = useQuery({
    queryKey: ["customer", "all"],
    queryFn: () => readCustomers({ limit: 10000, offset: 0 }),
    staleTime: 1000 * 60 * 60,
  });

  const { data: staffs, isLoading: isStaffsLoading } = useQuery({
    queryKey: ["staff", "all"],
    queryFn: () => readStaffs({ limit: 10000, offset: 0 }),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <main className="mt-2 flex w-full flex-col gap-4">
      <div className="grid grid-cols-4 gap-4 xl:grid-cols-2 sm:grid-cols-1 sm:gap-2">
        <DataCard
          title="Nhập hàng"
          data="0 sản phẩm"
          previousData="Chua xong"
          icon={<PackageSearch className="text-muted-foreground h-4 w-4" />}
        />
        <DataCard
          title="Tồn kho"
          data={(productStorages?.data?.length.toString() ?? "0") + " sản phẩm"}
          previousData="Tổng sản phẩm hiện tại"
          icon={<Container className="text-muted-foreground h-4 w-4" />}
          isLoading={isProductStoragesLoading}
        />
        <SoldBarChart />
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
      <div className="grid grid-cols-2 gap-4 sm:gap-2">
        <StorageTables />
      </div>
    </main>
  );
}
