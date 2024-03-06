"use client";

import { BarChart, Title } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import { readOrdersNumbersByDateRange } from "@app/_actions/order";
import useDatePicker from "@/zustand/useDatePicker";
import ChartLoading from "@app/(protected)/dashboard/Components/ChartLoading";

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} VND`;

export default function RevenueBarChart() {
  const { from, to } = useDatePicker();

  const { data: orderPricesByMonth, isLoading } = useQuery({
    queryKey: ["orders-revenues", from, to],
    queryFn: async () => readOrdersNumbersByDateRange({ from: from, to: to }),
    staleTime: 1000 * 60 * 60,
  });

  const { chartData, totalRevenue } = ordersToChartData(
    orderPricesByMonth as { month: number; year: number; total: number }[]
  ) as OrdersToChartData;

  return (
    <div>
      {isLoading || !orderPricesByMonth ? (
        <div className="h-[600px] w-full">
          <ChartLoading />
        </div>
      ) : (
        <div className="h-[600px] w-full overflow-hidden rounded-xl border border-foreground/10 p-2">
          <Title className="ml-1">Revenues & Profits</Title>
          <h2 className="ml-1">
            Total revenue:{" "}
            <span className="text-[#6B7280]">
              {totalRevenue > 0 ? dataFormatter(totalRevenue) : "No data"}
            </span>
          </h2>
          {orderPricesByMonth && (
            <BarChart
              className="h-[80%] w-full"
              data={chartData}
              index="name"
              categories={["Revenue"]}
              colors={["green"]}
              valueFormatter={dataFormatter}
              yAxisWidth={90}
              onValueChange={(v) => console.log(v)}
            />
          )}
        </div>
      )}
    </div>
  );
}

interface OrdersToChartData {
  chartData: { name: string; Revenue: number }[];
  totalRevenue: number;
}

const ordersToChartData = (
  orders:
    | {
        month: number;
        year: number;
        total: number;
      }[]
    | null
) => {
  let chartData: {
    name: string;
    Revenue: number;
  }[] = [];

  let totalRevenue = 0;

  if (orders && orders.length > 0) {
    if (Array.isArray(orders) && orders.length > 0) {
      orders.sort((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        }
        return a.month - b.month;
      });

      for (let i = 0; i < orders.length; i++) {
        chartData.push({
          name: `${orders[i].month}, ${orders[i].year}`,
          Revenue: orders[i].total,
        });
        totalRevenue += orders[i].total;
      }
    }

    return { chartData, totalRevenue } as OrdersToChartData;
  } else return [];
};
