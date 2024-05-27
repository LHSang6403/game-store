"use client";

import formatCurrency from "@/utils/functions/formatCurrency";
import { Button } from "@/components/ui/button";
import { useOrder, OrderState } from "@/zustand/useOrder";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "./Columns";
import formatVNDate from "@/utils/functions/formatVNDate";

export default function OrderSummary() {
  const { order, removeAll } = useOrder() as OrderState;
  const products = order?.products;

  return (
    <>
      {order && (
        <div className="flex h-fit w-full flex-col gap-1 text-sm">
          <div className="flex w-full flex-row items-center justify-between sm:flex-col-reverse sm:items-start sm:justify-start sm:gap-2">
            <h2 className="text-lg font-semibold sm:mt-2 sm:text-base">
              Tóm tắt đơn hàng
            </h2>
            <Button
              onClick={() => {
                removeAll();
              }}
              variant="outline"
              className="bg- sm:w-full"
            >
              Xóa tất cả
            </Button>
          </div>
          <p>
            <span className="">Vào lúc:</span>{" "}
            {formatVNDate(new Date(order.created_at))}
          </p>
          <p>
            <span className="">Tình trạng:</span> {order.state}
          </p>
          <p className="sm:mb-2">
            <span className="">Giá trước phí:</span>{" "}
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
