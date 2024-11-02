"use client";

import { useMemo, useCallback } from "react";
import RevenueBarChart from "@/app/(protected)/dashboard/_components/Charts/RevenueBarChart";
import { Banknote, Signal, Map, LocateFixed } from "lucide-react";
import DataCard from "@/app/(protected)/dashboard/_components/DataCard";
import { useQuery } from "@tanstack/react-query";
import { readOrdersByDateRange } from "@app/_actions/order";
import formatCurrency from "@/utils/functions/formatCurrency";
import useDatePicker from "@/zustand/useDatePicker";
import { DateRangePicker } from "@components/Picker/RangeDate/DateRangePicker";
import formatVNDate from "@/utils/functions/formatVNDate";

export default function Dashboard() {
  const { from, to } = useDatePicker();

  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["orders-range", from, to],
    queryFn: async () => readOrdersByDateRange({ from: from, to: to }),
    staleTime: 60 * (60 * 1000),
  });

  const calculateTotalOrderPrice = useCallback((orders) => {
    return (
      orders?.data?.reduce((total, order) => total + order.total_price, 0) ?? 0
    );
  }, []);

  const countOrdersByProvince = useCallback((orders) => {
    const ordersByProvince: Record<string, number> = {};

    orders?.data?.forEach((order) => {
      const { province } = order;
      ordersByProvince[province] = (ordersByProvince[province] || 0) + 1;
    });

    return ordersByProvince;
  }, []);

  const totalOrderPrice = useMemo(
    () => calculateTotalOrderPrice(orders),
    [orders, calculateTotalOrderPrice]
  );

  const ordersByProvince = useMemo(
    () => countOrdersByProvince(orders),
    [orders, countOrdersByProvince]
  );

  const hoChiMinhOrdersCount = useMemo(
    () => ordersByProvince?.["Thành phố Hồ Chí Minh"] ?? 0,
    [ordersByProvince]
  );

  const haNoiOrdersCount = useMemo(
    () => ordersByProvince?.["Thành phố Hà Nội"] ?? 0,
    [ordersByProvince]
  );

  const { maxOrdersProvince, maxOrdersCount } = useMemo(() => {
    let maxOrdersProvince = "Không có";
    let maxOrdersCount = 0;

    for (const province in ordersByProvince) {
      if (ordersByProvince[province] > maxOrdersCount) {
        maxOrdersCount = ordersByProvince[province];
        maxOrdersProvince = province;
      }
    }

    return { maxOrdersProvince, maxOrdersCount };
  }, [ordersByProvince]);

  return (
    <main className="flex w-full flex-col gap-4 pb-4 pt-2 xl:col-span-3 sm:gap-2 sm:py-0">
      <div className="flex h-fit w-full flex-row items-center justify-between lg:flex-col lg:gap-2">
        <h1>
          Dữ liệu từ {formatVNDate(from)} đến {formatVNDate(to)}
        </h1>
        <div className="lg:w-full">
          <DateRangePicker showCompare={false} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 xl:grid-cols-2 sm:grid-cols-1 sm:gap-2">
        <DataCard
          title="Tổng doanh thu"
          data={formatCurrency(totalOrderPrice).toString()}
          previousData="Lợi nhuận chưa rõ"
          icon={<Banknote className="text-muted-foreground h-4 w-4" />}
          isLoading={isOrdersLoading}
        />
        <DataCard
          title="Tỉnh bán chạy nhất"
          data={maxOrdersCount.toString() + " đơn"}
          previousData={maxOrdersProvince}
          icon={<Signal className="text-muted-foreground h-4 w-4" />}
          isLoading={isOrdersLoading}
        />
        <DataCard
          title="Hồ Chí Minh"
          data={hoChiMinhOrdersCount.toString() + " đơn"}
          previousData="Tổng đơn hàng tại khu vực Hồ Chí Minh"
          icon={<Map className="text-muted-foreground h-4 w-4" />}
          isLoading={isOrdersLoading}
        />
        <DataCard
          title="Hà nội"
          data={haNoiOrdersCount.toString() + " đơn"}
          previousData="Tổng đơn hàng tại khu vực Hà Nội"
          icon={<LocateFixed className="text-muted-foreground h-4 w-4" />}
          isLoading={isOrdersLoading}
        />
      </div>
      <div className="">
        <RevenueBarChart />
      </div>
    </main>
  );
}
