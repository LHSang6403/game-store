"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown, ArrowUpRight } from "lucide-react";
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
import { toast } from "sonner";
import { useSession } from "@/zustand/useSession";
import { useRouter } from "next/navigation";
import formatVNDate from "@/utils/functions/formatVNDate";

export const columns_headers = [
  { accessKey: "brand", name: "Hãng sản xuất" },
  { accessKey: "name", name: "Tên sản phẩm" },
  { accessKey: "price", name: "Giá" },
  { accessKey: "category", name: "Loại" },
  { accessKey: "created_at", name: "Ngày tạo" },
  { accessKey: "actions", name: "Hành động" },
];

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "brand",
    header: "Hãng sản xuất",
    cell: ({ row }) => {
      const data = row.original;

      return <div className="max-w-32">{formatCurrency(data.brand)}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-3 max-w-36 overflow-ellipsis sm:w-20">
          {formatCurrency(data.name)}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => {
      const data = row.original;

      return <div className="">{formatCurrency(data.price)} VNĐ</div>;
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
        <div className="flex w-32 items-center justify-center border-none">
          <Button
            variant="outline"
            className="border-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ngày tạo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formatted = formatVNDate(date);

      return <div className="w-32 text-center">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: () => {
      return <div className="w-full text-center">Hành động</div>;
    },
    cell: ({ row }) => {
      const product = row.original;
      const session = useSession();
      const router = useRouter();

      async function removeHandler() {
        toast.promise(
          async () => {
            if (!session.session)
              throw new Error("Không xác định phiên đăng nhập.");

            const result = await removeProductById({
              product: product,
              actor: {
                actorId: session.session.id,
                actorName: session.session.name,
              },
            });

            if (result.error) throw new Error(result.error);
          },
          {
            success: "Xóa thành công.",
            loading: "Đang xóa sản phẩm...",
            error: (error: any) => {
              return error.message;
            },
          }
        );
      }

      return (
        <div className="flex w-full items-center justify-center">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <ArrowUpRight
              onClick={() => router.push("/product/" + product.id)}
              className="h-4 w-4"
            />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
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
                <button
                  onClick={() =>
                    router.push("/dashboard/product/" + product.id)
                  }
                >
                  Chỉnh sửa
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => removeHandler()}>
                Xóa sản phẩm
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
