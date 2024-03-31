"use client";

import SoldBarChart from "@/app/(protected)/dashboard/Components/Charts/SoldBarChart";
import StorageTable from "@/app/(protected)/dashboard/Components/StorageTable";
import { Activity, PackageSearch, UsersRound, Container } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataCard from "@/app/(protected)/dashboard/Components/DataCard";

export default function Dashboard() {
  return (
    <main className="mt-2 flex w-full flex-col gap-4">
      <div className="grid grid-cols-4 gap-4 xl:grid-cols-2 sm:grid-cols-1 sm:gap-2">
        <DataCard
          title="Nhập hàng"
          data="120 sản phẩm"
          previousData="Nhập 120 hôm qua"
          icon={<PackageSearch className="text-muted-foreground h-4 w-4" />}
        />
        <DataCard
          title="Tồn kho"
          data="120 sản phẩm"
          previousData="120 sản phẩm tháng trước"
          icon={<Container className="text-muted-foreground h-4 w-4" />}
        />
        <DataCard
          title="Khách hàng"
          data="573 người dùng"
          previousData="+21 hôm qua"
          icon={<Activity className="text-muted-foreground h-4 w-4" />}
        />
        <DataCard
          title="Nhân viên"
          data="40 nhân viên"
          previousData="Ở Hà Nội và TP Hồ Chí Minh"
          icon={<UsersRound className="text-muted-foreground h-4 w-4" />}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-2">
        <Card className="h-fit xl:col-span-2">
          <CardHeader className="flex flex-row items-center pb-0">
            <div className="grid gap-2">
              <CardTitle>Đã bán</CardTitle>
              <CardDescription>Các sản phẩm đã bán gần đây</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="mt-2 h-fit">
            <SoldBarChart />
          </CardContent>
        </Card>
        <Card className="h-fit xl:col-span-2">
          <CardHeader className="flex flex-row items-center pb-0">
            <div className="grid gap-2">
              <CardTitle>Kho bãi</CardTitle>
              <CardDescription>
                Hệ thống kho của cửa hàng toàn quốc
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="mt-2 h-fit">
            <StorageTable />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
