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
  // {
  //   accessorKey: "prod_quantities",
  //   header: "Quantity",
  //   cell: ({ row }) => {
  //     const data = row.original;
  //     const { increaseQuantity, decreaseQuantity } = useOrder();
  //     const { data: product, isSuccess } = useProductQuery({
  //       id: row.original.prod_ids[0],
  //     });

  //     return (
  //       <div className="flex flex-row items-center justify-center gap-1.5">
  //         <svg
  //           onClick={() =>
  //             isSuccess && decreaseQuantity(data.prod_ids[0], product?.price)
  //           }
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke-width="1.5"
  //           stroke="currentColor"
  //           className="h-3 w-3 hover:cursor-pointer"
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             d="m19.5 8.25-7.5 7.5-7.5-7.5"
  //           />
  //         </svg>
  //         <p>{data.prod_quantities}</p>
  //         <svg
  //           onClick={() =>
  //             isSuccess && increaseQuantity(data.prod_ids[0], product?.price)
  //           }
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke-width="1.5"
  //           stroke="currentColor"
  //           className="h-3 w-3 hover:cursor-pointer"
  //         >
  //           <path
  //             stroke-linecap="round"
  //             stroke-linejoin="round"
  //             d="m4.5 15.75 7.5-7.5 7.5 7.5"
  //           />
  //         </svg>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const data = row.original;
      const { data: product, isSuccess } = useProductQuery({
        id: data.id,
      });

      return (
        <>
          {isSuccess ? (
            <span>{formatCurrency(product?.price)} VND</span>
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
