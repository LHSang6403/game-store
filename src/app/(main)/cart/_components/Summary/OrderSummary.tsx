"use client";

import formatCurrency from "@/utils/functions/formatCurrency";
import { Button } from "@/components/ui/button";
import { useOrder, OrderState } from "@/zustand/useOrder";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "./Columns";
import formatVNDate from "@/utils/functions/formatVNDate";
import {
  ProductWithQuantity,
  ProductWithDescriptionAndStorageType,
} from "@/utils/types";
import { useMemo } from "react";

export default function OrderSummary() {
  const { order, removeAll } = useOrder() as OrderState;
  const products = order?.products;

  const productsWithQuantities = useMemo(() => {
    const productQuantities: ProductWithQuantity[] = [];
    products?.forEach((product: ProductWithDescriptionAndStorageType) => {
      const existingProduct = productQuantities.find(
        (p) => p.product.product.id === product.product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        productQuantities.push({ product: product, quantity: 1 });
      }
    });

    return productQuantities;
  }, [products, products?.length]);

  return (
    <>
      {order && (
        <div className="flex h-fit w-full flex-col gap-1 text-sm">
          <div className="flex w-full flex-col-reverse items-start justify-start gap-2 md:flex-row md:items-center md:justify-between">
            <h2 className="mt-2 text-base font-semibold md:text-lg">
              Tóm tắt đơn hàng
            </h2>
            <Button
              onClick={() => {
                removeAll();
              }}
              variant="outline"
              className="w-full md:w-fit"
            >
              Xóa tất cả
            </Button>
          </div>
          <p>Vào lúc: {formatVNDate(new Date(order.created_at))}</p>
          <p>Tình trạng: {order.state}</p>
          <p className="mb-2 md:mb-0">
            Giá trước phí: {formatCurrency(order.price)} VNĐ
          </p>
          <p className="mb-2 md:mb-0">
            Lưu ý: Hiện tại 2Win chỉ hỗ trợ ship COD
          </p>
        </div>
      )}
      {products && (
        <DataTable
          key={JSON.stringify(products)}
          columns={columns}
          data={productsWithQuantities}
          isPaginationEnabled={false}
          isCollumnVisibilityEnabled={false}
          isSearchEnabled={false}
        />
      )}
    </>
  );
}
