"use client";

import { useState, useEffect, useRef } from "react";
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
import { motion } from "framer-motion";
import formatVNDate from "@/utils/functions/formatVNDate";
import { DateRangePicker } from "@/components/Picker/RangeDate/DateRangePicker";

export default function Dashboard() {
  const { from, to } = useDatePicker();

  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["orders", "all"],
    queryFn: () => readOrders({ offset: 0, limit: 10000 }),
    staleTime: 1000 * 60 * 60,
  });

  const totalOrderPrice =
    orders?.data?.reduce((total, order) => total + order.total_price, 0) ?? 0;

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
        <div className="grid grid-cols-2 gap-4 sm:gap-2">
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
              <RevenueBarChart />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="col-span-1 h-full xl:col-span-3">
        <RightCard />
      </div>
    </main>
  );
}
