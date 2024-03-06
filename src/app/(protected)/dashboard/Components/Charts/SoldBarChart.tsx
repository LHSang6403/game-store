"use client";

import { BarList, Title } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import { readProducts } from "@/app/_actions/product";
import type { ProductType } from "@utils/types/index";
import ChartLoading from "@/app/(protected)/dashboard/Components/ChartLoading";

export default function RevenueBarChart() {
  const limit = 20;
  const offset = 0;

  const { data: productsResponse, isLoading } = useQuery({
    queryKey: ["products", limit, offset],
    queryFn: async () => readProducts({ limit: limit, offset: offset }),
    staleTime: 1000 * 60 * 60,
  });

  const products = productsResponse?.data as ProductType[];

  let chartData: {
    name: string;
    value: number;
  }[] = [];

  for (let i = 0; i < products?.length; i++) {
    const name = products[i].name ?? "Unknown";
    const sold = products[i].sold_quantity ?? 0;

    chartData.push({
      name: name,
      value: sold,
    });
  }

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="h-[400px]">
          <ChartLoading />
        </div>
      ) : (
        <div className="min-h-[400px] w-full overflow-hidden rounded-xl border border-foreground/10 p-2 pb-3">
          <Title className="ml-1">Sold Products</Title>
          <BarList data={chartData} className="mx-2 mt-3 w-auto" />
        </div>
      )}
    </div>
  );
}
