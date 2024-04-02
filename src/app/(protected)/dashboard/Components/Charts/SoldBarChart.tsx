"use client";

import { BarList } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import type { OrderType } from "@utils/types/index";
import ChartLoading from "@/app/(protected)/dashboard/Components/ChartLoading";
import useDatePicker from "@/zustand/useDatePicker";
import { readOrdersByDateRange } from "@/app/_actions/order";

export default function RevenueBarChart() {
  const { from, to } = useDatePicker();

  const { data: ordersResponse, isLoading } = useQuery({
    queryKey: ["orders", from, to],
    queryFn: async () => readOrdersByDateRange({ from: from, to: to }),
    staleTime: 1000 * 60 * 5,
  });

  const orders = ordersResponse?.data as OrderType[];
  const chartData = ordersToSoldProducts(orders);

  return (
    <div className="w-full">
      {isLoading || !ordersResponse ? (
        <div className="h-[400px]">
          <ChartLoading />
        </div>
      ) : (
        <div className="min-h-[100px] w-full overflow-hidden">
          {ordersResponse && (
            <BarList data={chartData} className="mr-1.5 mt-3 w-auto" />
          )}
        </div>
      )}
    </div>
  );
}

function ordersToSoldProducts(orders: OrderType[]) {
  let soldProducts: {
    name: string;
    value: number;
  }[] = [];

  if (orders && orders.length > 0) {
    orders?.forEach((order) => {
      order.products?.forEach((product) => {
        const existingProductIndex = soldProducts.findIndex(
          (soldProduct) => soldProduct.name === product.product.name
        );

        if (existingProductIndex !== -1) {
          soldProducts[existingProductIndex].value += 1;
        } else {
          soldProducts.push({ name: product.product.name, value: 1 });
        }
      });
    });

    const sortedData = soldProducts.sort((a, b) => b.value - a.value);
    const top3 = sortedData.slice(0, 3);

    return top3;
  } else return [];
}
