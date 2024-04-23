"use client";

import RevenueBarChart from "@/app/(protected)/dashboard/Components/Charts/RevenueBarChart";
import { Banknote, Signal, Map, LocateFixed } from "lucide-react";
import DataCard from "@/app/(protected)/dashboard/Components/DataCard";
import { useQuery } from "@tanstack/react-query";
import { readOrdersByDateRange } from "@app/_actions/order";
import formatCurrency from "@/utils/functions/formatCurrency";
import useDatePicker from "@/zustand/useDatePicker";
import { DateRangePicker } from "@components/Picker/RangeDate/DateRangePicker";
import formatVNDate from "@/utils/functions/formatVNDate";

export default function Dashboard() {
  const { from, to } = useDatePicker();

  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["orders", from, to],
    queryFn: async () => readOrdersByDateRange({ from: from, to: to }),
    staleTime: 1000 * 60 * 5,
  });

  const calculateTotalOrderPrice = (orders) => {
    return (
      orders?.data?.reduce((total, order) => total + order.total_price, 0) ?? 0
    );
  };

  const countOrdersByProvince = (orders) => {
    const ordersByProvince = {};

    orders?.data?.forEach((order) => {
      const { province } = order;
      ordersByProvince[province] = (ordersByProvince[province] || 0) + 1;
    });

    return ordersByProvince;
  };

  const hoChiMinhOrdersCount =
    countOrdersByProvince(orders)?.["Thành phố Hồ Chí Minh"] ?? 0;
  const haNoiOrdersCount =
    countOrdersByProvince(orders)?.["Thành phố Hà Nội"] ?? 0;
  const ordersByProvince = countOrdersByProvince(orders);

  let maxOrdersProvince = "Không có";
  let maxOrdersCount = 0;

  for (const province in ordersByProvince) {
    if (ordersByProvince[province] > maxOrdersCount) {
      maxOrdersCount = ordersByProvince[province];
      maxOrdersProvince = province;
    }
  }

  const totalOrderPrice = calculateTotalOrderPrice(orders);

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
