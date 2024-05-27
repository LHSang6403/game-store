"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ProductWithQuantity,
  ProductWithDescriptionAndStorageType,
} from "@utils/types";
import formatCurrency from "@utils/functions/formatCurrency";
import { Button } from "@components/ui/button";
import { Trash2 } from "lucide-react";
import { useOrder, OrderState } from "@/zustand/useOrder";
import { Plus, Minus } from "lucide-react";

export const columns: ColumnDef<ProductWithQuantity>[] = [
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-3 w-full overflow-ellipsis">
          {data.product.product.name}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => {
      return <div className="w-36 text-left sm:w-full">Giá tiền</div>;
    },
    cell: ({ row }) => {
      const data = row.original;
      const { removeProduct, addProduct } = useOrder() as OrderState;

      return (
        <div className="flex w-full flex-col items-start">
          <div className="w-full text-left">
            {formatCurrency(data?.product.product.price * data?.quantity)}{" "}
            <span className="sm:hidden">VNĐ</span>
          </div>
          <div className="-ml-4 -mt-1 hidden h-fit w-full sm:block">
            <QuantityButtons
              data={data}
              addProduct={() => addProduct(data.product)}
              removeProduct={() => removeProduct(data.product.product.id)}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => {
      return <div className="text-center sm:hidden">Số lượng</div>;
    },
    cell: ({ row }) => {
      const data = row.original;
      const { removeProduct, addProduct } = useOrder() as OrderState;

      return (
        <div className="flex w-full justify-center">
          <div className="flex max-w-32 justify-center sm:hidden">
            <QuantityButtons
              data={data}
              addProduct={() => addProduct(data.product)}
              removeProduct={() => removeProduct(data.product.product.id)}
            />
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      const { removeAllById } = useOrder() as OrderState;

      return (
        <div className="flex w-fit justify-end sm:-ml-10 sm:justify-start">
          <Button
            onClick={() => removeAllById(data.product.product.id)}
            variant="ghost"
            className="h-fit"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

function QuantityButtons({
  data,
  removeProduct,
  addProduct,
}: {
  data: ProductWithQuantity;
  removeProduct: (id: string) => void;
  addProduct: (product: ProductWithDescriptionAndStorageType) => void;
}) {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Button
        variant="ghost"
        className="h-fit sm:hover:bg-background"
        onClick={() => removeProduct(data.product.product.id)}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <div className="mx-2 w-6 text-center sm:mx-0">{data?.quantity}</div>
      <Button
        className="h-fit sm:hover:bg-background"
        variant="ghost"
        onClick={() => addProduct(data.product)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
