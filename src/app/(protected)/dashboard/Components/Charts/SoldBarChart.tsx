"use client";

import { BarList } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import type { OrderType } from "@utils/types/index";
import ChartLoading from "@/app/(protected)/dashboard/Components/ChartLoading";
import useDatePicker from "@/zustand/useDatePicker";
import { readOrdersByDateRange } from "@/app/_actions/order";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@components/ui/card";
import formatVNDate from "@utils/functions/formatVNDate";

export default function RevenueBarChart() {
  const { from, to } = useDatePicker();

  const { data: ordersResponse, isLoading } = useQuery({
    queryKey: ["orders", from, to],
    queryFn: async () => readOrdersByDateRange({ from: from, to: to }),
    staleTime: 1000 * 60 * 5,
  });

  const orders = ordersResponse?.data as OrderType[];
  const chartData = ordersToTop3SoldProducts(orders);

  return (
    <Card className="col-span-2 row-span-2 h-full xl:col-span-4">
      <CardHeader className="flex flex-row items-center pb-0">
        <div className="grid gap-2">
          <CardTitle>Bán chạy</CardTitle>
          <CardDescription>
            Các sản phẩm bán chạy từ {formatVNDate(from)} đến {formatVNDate(to)}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-2 h-fit">
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
      </CardContent>
    </Card>
  );
}

export function ordersToTop3SoldProducts(orders: OrderType[]) {
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
