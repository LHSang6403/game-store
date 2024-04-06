"use client";

import formatReadableTime from "@utils/functions/formatTime";
import formatCurrency from "@/utils/functions/formatCurrency";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/zustand/useOrder";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "./Columns";

export default function OrderSummary() {
  const { order, removeAll } = useOrder();
  const products = order?.products;

  return (
    <>
      {order && (
        <div className="flex h-fit w-full flex-col gap-1">
          <div className="flex w-full flex-row items-center justify-between sm:flex-col-reverse sm:items-start sm:justify-start sm:gap-2">
            <h2 className="text-lg font-semibold">Tóm tắt đơn hàng</h2>
            <Button
              onClick={() => {
                removeAll();
              }}
              variant="outline"
            >
              Xóa tất cả
            </Button>
          </div>
          <p>
            <span className="font-semibold">Vào lúc:</span>{" "}
            {formatReadableTime(order.created_at)}
          </p>
          <p>
            <span className="font-semibold">Tình trạng:</span> {order.state}
          </p>
          <p>
            <span className="font-semibold">Giá trước phí:</span>{" "}
            {formatCurrency(order.price)} VNĐ
          </p>
        </div>
      )}
      {products && (
        <DataTable
          key={JSON.stringify(products)}
          columns={columns}
          data={products}
          isPaginationEnabled={false}
          isCollumnVisibilityEnabled={false}
          isSearchEnabled={false}
        />
      )}
    </>
  );
}
