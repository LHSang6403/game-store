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
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { DateRangePicker } from "@/components/Picker/RangeDate/DateRangePicker";

export default function RevenueBarChart() {
  const { from, to } = useDatePicker();

  const { data: ordersResponse, isLoading } = useQuery({
    queryKey: ["orders", from, to],
    queryFn: async () => readOrdersByDateRange({ from: from, to: to }),
    staleTime: 1000 * 60 * 5,
  });

  const orders = ordersResponse?.data as OrderType[];
  const chartData = ordersToTop3SoldProducts(orders);

  // show range time when scroll to the Sold bar chart
  const cardRef = useRef(null);
  const [showRangeTime, setShowRangeTime] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowRangeTime(true);
        } else {
          setShowRangeTime(false);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <Card className="col-span-2 row-span-2 h-full xl:col-span-4" ref={cardRef}>
      <CardHeader className="flex flex-col pb-0">
        <CardTitle className="mb-2 flex flex-row justify-between">
          <span>Bán chạy</span>
          <div className="sm:hidden">
            <DateRangePicker locale="en-GB" showCompare={false} />
          </div>
        </CardTitle>
        <div className="flex w-full flex-row items-center justify-between sm:flex-col sm:gap-2">
          <CardDescription className="w-full">
            Sản phẩm bán chạy{" "}
            <span className="hidden sm:block">
              từ {formatVNDate(from)} đến {formatVNDate(to)}
            </span>
          </CardDescription>
          {showRangeTime && (
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              className="fixed bottom-12 z-40 mb-2 hidden sm:block"
            >
              <DateRangePicker locale="en-GB" showCompare={false} />
            </motion.div>
          )}
        </div>
      </CardHeader>
      <CardContent className="mt-2 h-fit sm:px-6 sm:pb-6">
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
