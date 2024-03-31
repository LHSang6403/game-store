"use client";

import RevenueBarChart from "@/app/(protected)/dashboard/Components/Charts/RevenueBarChart";
import { Wallet, Banknote, HandCoins } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataCard from "@/app/(protected)/dashboard/Components/DataCard";
import RightCard from "@/app/(protected)/dashboard/finance/Components/RightCard";

export default function Dashboard() {
  return (
    <main className="mt-2 flex w-full flex-row gap-4 xl:flex-col">
      <div className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-3 gap-4 xl:grid-cols-2 sm:grid-cols-1 sm:gap-2">
          <DataCard
            title="Doanh thu"
            data="95.000.000"
            previousData="Tăng 20%"
            icon={<Banknote className="text-muted-foreground h-4 w-4" />}
          />
          <DataCard
            title="Lợi nhuận"
            data="23.000.000"
            previousData="Tăng 10% hôm qua"
            icon={<HandCoins className="text-muted-foreground h-4 w-4" />}
          />
          <DataCard
            title="Tiền mặt"
            data="120.000.000"
            previousData="Nhập 120 hôm qua"
            icon={<Wallet className="text-muted-foreground h-4 w-4" />}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-2">
          <Card className="col-span-2 h-fit">
            <CardHeader className="flex flex-row items-center pb-0">
              <div className="grid gap-2">
                <CardTitle>Doanh thu</CardTitle>
                <CardDescription>Doanh thu của hệ thống</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-2 h-fit">
              <RevenueBarChart />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-96 xl:w-full">
        <RightCard />
      </div>
    </main>
  );
}
