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
    <main className="flex w-full flex-col md:gap-4 md:col-span-1 md:pb-4 md:pt-2 col-span-3 gap-2 py-0">
      <div className="flex h-fit w-full md:gap-0 md:flex-row items-center justify-between flex-col gap-2">
        <h1>
          Dữ liệu từ {formatVNDate(from)} đến {formatVNDate(to)}
        </h1>
        <div className="w-full md:w-fit">
          <DateRangePicker showCompare={false} />
        </div>
      </div>
      <div className="grid xl:grid-cols-4 md:gap-4 md:grid-cols-2 grid-cols-1 gap-2">
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
