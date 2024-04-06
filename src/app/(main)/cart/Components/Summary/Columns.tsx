"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductWithDescriptionAndStorageType } from "@utils/types";
import formatCurrency from "@utils/functions/formatCurrency";
import { Button } from "@components/ui/button";
import { Trash2 } from "lucide-react";
import { useOrder } from "@/zustand/useOrder";

export const columns: ColumnDef<ProductWithDescriptionAndStorageType>[] = [
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-3 w-44 overflow-ellipsis sm:w-16">
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

      return <span>{formatCurrency(data?.product.price)} VNĐ</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      const { removeProduct } = useOrder();

      return (
        <Button
          onClick={() => removeProduct(data.product.id)}
          variant="ghost"
          className="h-fit"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      );
    },
  },
];
