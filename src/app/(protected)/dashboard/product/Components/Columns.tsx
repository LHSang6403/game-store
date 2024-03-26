"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ProductType } from "@utils/types";
import formatCurrency from "@utils/functions/formatCurrency";
import { removeProductById } from "@app/_actions/product";
import Link from "next/link";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";
import { toast } from "sonner";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const data = row.original;
      return <div className="">{formatCurrency(data.price)} VND</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="outline"
          className="border-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formatted = date.toLocaleDateString();
      return <div className="ml-4">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",

    cell: ({ row }) => {
      const product = row.original;

      async function removeHandler(id: string) {
        toast.promise(
          async () => {
            const unprocessedRemoveResponse = await removeProductById(id);

            const removeResponse = ApiErrorHandlerClient({
              response: unprocessedRemoveResponse,
            });
          },
          {
            loading: "Removing product...",
          }
        );
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-2 h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/dashboard/product/" + product.id}>
                Edit product
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => removeHandler(product.id)}>
              Remove product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
