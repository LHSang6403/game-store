"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductWithDescriptionAndStorageType } from "@utils/types";
import formatCurrency from "@utils/functions/formatCurrency";
import { Button } from "@components/ui/button";
import { Trash2 } from "lucide-react";
import { useOrder, OrderState } from "@/zustand/useOrder";

export const columns: ColumnDef<ProductWithDescriptionAndStorageType>[] = [
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-3 w-full overflow-ellipsis">
          {data.product.name}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Giá tiền",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <span className="w-full">
          {formatCurrency(data?.product.price)} VNĐ
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      const { removeProduct } = useOrder() as OrderState;

      return (
        <div className="flex justify-end">
          <Button
            onClick={() => removeProduct(data.product.id)}
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
