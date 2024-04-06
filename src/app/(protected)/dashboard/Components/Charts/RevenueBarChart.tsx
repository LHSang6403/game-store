"use client";

import { BarChart } from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import { readOrdersNumbersByDateRange } from "@app/_actions/order";
import DashboardLoading from "@app/(protected)/dashboard/Components/DashboardLoading";
import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useDatePicker from "@/zustand/useDatePicker";
import { motion } from "framer-motion";
import formatVNDate from "@/utils/functions/formatVNDate";
import { DateRangePicker } from "@/components/Picker/RangeDate/DateRangePicker";

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} VNĐ`;

export default function RevenueBarChart() {
  const { from, to } = useDatePicker();

  const { data: orderPricesByMonth, isLoading } = useQuery({
    queryKey: ["orders-revenues", from, to],
    queryFn: async () => readOrdersNumbersByDateRange({ from: from, to: to }),
    staleTime: 1000 * 60 * 60,
  });

  const { chartData } = ordersToChartData(
    orderPricesByMonth as { month: number; year: number; total: number }[]
  ) as OrdersToChartData;

  // show range time when scroll to the Revenue bar chart
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
    <Card className="col-span-2 h-fit" ref={cardRef}>
      <CardHeader className="pb-0">
        <CardTitle className="mb-2 flex flex-row justify-between">
          <span>Doanh thu</span>
          <div className="sm:hidden">
            <DateRangePicker locale="en-GB" showCompare={false} />
          </div>
        </CardTitle>
        <div className="flex w-full flex-row items-center justify-between sm:flex-col sm:gap-2">
          <CardDescription>
            Doanh thu của hệ thống toàn quốc{" "}
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
      <CardContent className="mt-2 h-fit">
        <div>
          {isLoading || !orderPricesByMonth ? (
            <div className="h-[400px] w-full">
              <DashboardLoading />
            </div>
          ) : (
            <div className="h-[400px] w-full overflow-hidden">
              {orderPricesByMonth && (
                <BarChart
                  className="h-full w-full"
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
      </CardContent>
    </Card>
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
