"use client";

import RevenueBarChart from "@/app/(protected)/dashboard/Components/Charts/RevenueBarChart";
import { Banknote, HandCoins } from "lucide-react";
import DataCard from "@/app/(protected)/dashboard/Components/DataCard";
import RightCard from "@/app/(protected)/dashboard/finance/Components/RightCard";
import { useQuery } from "@tanstack/react-query";
import { readOrders } from "@app/_actions/order";
import formatCurrency from "@/utils/functions/formatCurrency";

export default function Dashboard() {
  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["orders", "all"],
    queryFn: () => readOrders({ offset: 0, limit: 10000 }),
    staleTime: 1000 * 60 * 60,
  });

  const totalOrderPrice =
    orders?.data?.reduce((total, order) => total + order.total_price, 0) ?? 0;

  return (
    <main className="grid w-full grid-cols-3 flex-row gap-4 pt-2 sm:gap-2 sm:pt-0">
      <div className="col-span-2 flex w-full flex-col gap-4 xl:col-span-3 sm:gap-2">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 sm:gap-2">
          <DataCard
            title="Tổng doanh thu"
            data={formatCurrency(totalOrderPrice).toString()}
            previousData="Doanh thu trên tổng số đơn hàng online"
            icon={<Banknote className="text-muted-foreground h-4 w-4" />}
            isLoading={isOrdersLoading}
          />
          <DataCard
            title="Tổng lợi nhuận"
            data="000.000"
            previousData="Tăng 10% hôm qua"
            icon={<HandCoins className="text-muted-foreground h-4 w-4" />}
            isLoading={false}
          />
        </div>
        <div className="">
          <RevenueBarChart />
        </div>
      </div>
      <div className="col-span-1 h-full xl:col-span-3">
        <RightCard />
      </div>
    </main>
  );
}
