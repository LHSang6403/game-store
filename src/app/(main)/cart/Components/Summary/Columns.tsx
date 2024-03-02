"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductWithDescriptionAndStorageType } from "@utils/types";
import formatCurrency from "@utils/functions/formatCurrency";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useProductQuery from "@/hooks/useProductQuery";
import { useOrder } from "@/zustand/useOrder";

export const columns: ColumnDef<ProductWithDescriptionAndStorageType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-3 w-44 overflow-ellipsis sm:w-16">
          {data.name}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const data = row.original;

      return <span>{formatCurrency(data?.price)} VND</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      const { data: product, isSuccess } = useProductQuery({
        id: data.id,
      });

      const { removeProduct } = useOrder();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-2 h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.id)}
            >
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                isSuccess && removeProduct(product.id);
              }}
            >
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
