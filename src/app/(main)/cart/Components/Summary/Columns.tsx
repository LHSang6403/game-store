"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OrderType } from "@utils/types";
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

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "prod_names",
    header: "Name",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="w-44 sm:w-16 line-clamp-3 overflow-ellipsis">
          {data.prod_names}
        </div>
      );
    },
  },
  {
    accessorKey: "prod_quantities",
    header: "Quantity",
    cell: ({ row }) => {
      const data = row.original;
      const { increaseQuantity, decreaseQuantity } = useOrder();
      const { data: product, isSuccess } = useProductQuery({
        id: row.original.prod_ids[0],
      });

      return (
        <div className="flex flex-row gap-1.5 justify-center items-center">
          <svg
            onClick={() =>
              isSuccess && decreaseQuantity(data.prod_ids[0], product?.price)
            }
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-3 h-3 hover:cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
          <p>{data.prod_quantities}</p>
          <svg
            onClick={() =>
              isSuccess && increaseQuantity(data.prod_ids[0], product?.price)
            }
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-3 h-3 hover:cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const data = row.original;
      const { data: product, isSuccess } = useProductQuery({
        id: row.original.prod_ids[0],
      });

      return (
        <>
          {isSuccess ? (
            <span>
              {formatCurrency(product?.price * data.prod_quantities[0])} VND
            </span>
          ) : (
            <span>Unknown price</span>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      const { data: product, isSuccess } = useProductQuery({
        id: row.original.prod_ids[0],
      });
      const { removeProduct } = useOrder();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.id)}
            >
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                // navigate to customer page
                console.log("customer:", data.customer_id, data.customer_name);
              }}
            >
              View customer
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                isSuccess && removeProduct(product.id, product.price);
              }}
            >
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  //   {
  //     accessorKey: "created_at",
  //     header: "Date",
  //     // header: () => {
  //     //   return <div className="sm:hidden">Date</div>;
  //     // },
  //     cell: ({ row }) => {
  //       const date = new Date(row.getValue("created_at"));
  //       const formatted = date.toLocaleDateString();
  //       return <div className="line-clamp-3 overflow-ellipsis">{formatted}</div>;
  //     },
  //   },
];
