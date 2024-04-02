"use client";

import RevenueBarChart from "@/app/(protected)/dashboard/Components/Charts/RevenueBarChart";
import { Banknote, HandCoins } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataCard from "@/app/(protected)/dashboard/Components/DataCard";
import RightCard from "@/app/(protected)/dashboard/finance/Components/RightCard";
import { useQuery } from "@tanstack/react-query";
import { readOrders } from "@app/_actions/order";
import formatCurrency from "@/utils/functions/formatCurrency";
import useDatePicker from "@/zustand/useDatePicker";
import formatVNDate from "@/utils/functions/formatVNDate";

export default function Dashboard() {
  const { from, to } = useDatePicker();

  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["orders", "all"],
    queryFn: () => readOrders({ offset: 0, limit: 10000 }),
    staleTime: 1000 * 60 * 60,
  });

  const totalOrderPrice =
    orders?.data?.reduce((total, order) => total + order.total_price, 0) ?? 0;

  return (
    <main className="mt-2 grid w-full grid-cols-3 flex-row gap-4">
      <div className="col-span-2 flex w-full flex-col gap-4 xl:col-span-3">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-2">
          <DataCard
            title="Doanh thu"
            data={formatCurrency(totalOrderPrice).toString()}
            previousData="Doanh thu trên tổng số đơn hàng online"
            icon={<Banknote className="text-muted-foreground h-4 w-4" />}
            isLoading={isOrdersLoading}
          />
          <DataCard
            title="Lợi nhuận"
            data="000.000"
            previousData="Tăng 10% hôm qua"
            icon={<HandCoins className="text-muted-foreground h-4 w-4" />}
            isLoading={false}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-2">
          <Card className="col-span-2 h-fit">
            <CardHeader className="flex flex-row items-center pb-0">
              <div className="grid gap-2">
                <CardTitle>Doanh thu</CardTitle>
                <CardDescription>
                  Doanh thu của hệ thống từ {formatVNDate(from)} đến{" "}
                  {formatVNDate(to)}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-2 h-fit">
              <RevenueBarChart />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="col-span-1 xl:col-span-3">
        <RightCard />
      </div>
    </main>
  );
}
