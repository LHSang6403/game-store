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
import { useSession } from "@/zustand/useSession";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "brand",
    header: "Hiệu",
  },
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => {
      const data = row.original;
      return <div className="">{formatCurrency(data.price)} VND</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Loại",
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
          Ngày tạo
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
    header: "Hành động",

    cell: ({ row }) => {
      const product = row.original;
      const session = useSession();

      async function removeHandler() {
        toast.promise(
          async () => {
            if (session.session) {
              const removeResponse = await removeProductById({
                product: product,
                actor: {
                  actorId: session.session.id,
                  actorName: session.session.name,
                },
              });

              ApiErrorHandlerClient({
                response: removeResponse,
              });
            }
          },
          {
            loading: "Đang xóa sản phẩm...",
          }
        );
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-4 h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Sao chép ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/dashboard/product/" + product.id}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => removeHandler()}>
              Xóa sản phẩm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
