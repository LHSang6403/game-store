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
    header: () => {
      return <div className="w-32 text-left">Tên</div>;
    },
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-3 w-auto overflow-ellipsis">
          {data.product.product.name}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => {
      return <div className="w-full text-left md:w-36">Giá tiền</div>;
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
          <div className="-ml-4 -mt-1 block h-fit w-full md:hidden">
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
      return <div className="hidden text-center md:block">Số lượng</div>;
    },
    cell: ({ row }) => {
      const data = row.original;
      const { removeProduct, addProduct } = useOrder() as OrderState;

      return (
        <div className="flex w-full justify-center">
          <div className="hidden max-w-32 justify-center md:flex">
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
        <div className="-ml-10 flex w-fit justify-start md:ml-0 md:justify-end">
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
      <div className="w-6 text-center md:mx-2">{data?.quantity}</div>
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
