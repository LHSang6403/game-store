"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { readOrders } from "@app/_actions/order";
import type { OrderType } from "@utils/types/index";
import useDatePicker from "@/zustand/useDatePicker";
import { readOrdersByDateRange } from "@/app/_actions/order";
import { ordersToTop3SoldProducts } from "@app/(protected)/dashboard/Components/Charts/SoldBarChart";

export default function RightCard() {
  const {
    data: orders,
    isLoading: isOrdersLoading,
    isSuccess: isOrdersSuccess,
  } = useQuery({
    queryKey: ["orders", "all"],
    queryFn: () => readOrders({ offset: 0, limit: 10000 }),
    staleTime: 1000 * 60 * 60,
  });

  const { from, to } = useDatePicker();

  const { data: ordersResponse, isLoading } = useQuery({
    queryKey: ["orders", from, to],
    queryFn: async () => readOrdersByDateRange({ from: from, to: to }),
    staleTime: 1000 * 60 * 5,
  });

  const ordersData = ordersResponse?.data as OrderType[];
  const top3Orders = ordersToTop3SoldProducts(ordersData);

  const hoChiMinhOrdersCount =
    orders?.data?.filter((order) => order.province === "Thành phố Hồ Chí Minh")
      .length ?? 0;

  const haNoiOrdersCount =
    orders?.data?.filter((order) => order.province === "Thành phố Hà Nội")
      .length ?? 0;

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="bg-muted/50 flex flex-row items-start">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Báo cáo
          </CardTitle>
          <Button variant="outline" className="mt-2 h-8 w-full">
            In báo cáo
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="grid gap-3">
          <ul className="grid gap-3">
            <div className="font-semibold">Đơn hàng</div>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Khu vực Hồ Chí Minh</span>
              <span>{hoChiMinhOrdersCount}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Khu vực Hà Nội</span>
              <span>{haNoiOrdersCount}</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <div className="font-semibold">Kho bãi</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Nhập kho <span>HCM</span>
              </span>
              <span>0</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Xuất kho <span>HN</span>
              </span>
              <span>0</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Đang giao <span>HCM</span>
              </span>
              <span>0</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Đang giao <span>HN</span>
              </span>
              <span>0</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <div className="font-semibold">Sản phẩm</div>
            {top3Orders.map((order, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="text-muted-foreground">Bán chạy</span>
                <span>{order.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
