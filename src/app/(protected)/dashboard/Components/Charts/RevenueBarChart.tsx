"use client";

import { BarChart, Title } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import { getOrderPricesByYear } from "@app/_actions/order";
import { Skeleton } from "@/components/ui/skeleton";

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} VND`;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function RevenueBarChart() {
  const year = 2024;

  const { data: revenues, isLoading } = useQuery({
    queryKey: ["revenues", { year }],
    queryFn: async () => getOrderPricesByYear({ year: year }),
    staleTime: 1000 * 60 * 60,
  });

  let chartData: {
    name: string;
    Revenue: number;
    Profit: number;
    Loss: number;
  }[] = [];

  for (let i = 0; i < 12; i++) {
    const month = months[i];
    const revenue = revenues?.[i] ?? 0;
    const profit = revenue * 0.2;

    chartData.push({
      name: `${month} 2024`,
      Revenue: revenue,
      Profit: profit,
      Loss: 0,
    });
  }

  const totalRevenue = revenues?.reduce((acc, curr) => acc + curr, 0);
  const totalProfit = totalRevenue ? totalRevenue * 0.2 : 0;

  return (
    <div className="h-[600px] w-full overflow-hidden rounded-xl border border-foreground/10 p-2">
      {isLoading ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <Skeleton className="h-full w-full rounded-xl bg-foreground/10" />
          <Skeleton className="h-full w-full rounded-xl bg-foreground/10" />
          <Skeleton className="h-full w-full rounded-xl bg-foreground/10" />
        </div>
      ) : (
        <>
          <Title className="ml-1">Revenues & Profits</Title>
          <h2 className="ml-1 mt-1">
            Total revenue:{" "}
            <span className="text-[#6B7280]">
              {dataFormatter(totalRevenue ?? 0)}
            </span>
          </h2>
          <h2 className="ml-1">
            Total profit:{" "}
            <span className="text-[#6B7280]">{dataFormatter(totalProfit)}</span>
          </h2>
          <BarChart
            className="h-[80%] w-full"
            data={chartData}
            index="name"
            categories={["Revenue", "Profit", "Loss"]}
            colors={["indigo", "green", "red"]}
            valueFormatter={dataFormatter}
            yAxisWidth={170}
            onValueChange={(v) => console.log(v)}
          />
        </>
      )}
    </div>
  );
}
