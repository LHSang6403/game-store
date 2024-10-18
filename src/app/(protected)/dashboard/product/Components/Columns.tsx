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
import { useSession, SessionState } from "@/zustand/useSession";
import { useRouter } from "next/navigation";
import formatVNDate from "@/utils/functions/formatVNDate";
import Image from "next/image";
import { useCallback } from "react";

export const columns_headers = [
  { accessKey: "index", name: "STT" },
  { accessKey: "image", name: "Hình ảnh" },
  { accessKey: "name", name: "Tên sản phẩm" },
  { accessKey: "brand", name: "Hãng sản xuất" },
  { accessKey: "price", name: "Giá" },
  { accessKey: "category", name: "Loại" },
  { accessKey: "created_at", name: "Ngày tạo" },
  { accessKey: "actions", name: "Hành động" },
];

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "index",
    header: () => {
      return <div>STT</div>;
    },
    cell: ({ row }) => {
      const data = row.index + 1;

      return <div className="text-center">{data}</div>;
    },
  },
  {
    accessorKey: "image",
    header: () => {
      return <div className="text-center">Hình ảnh</div>;
    },
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-3 flex justify-center overflow-ellipsis">
          <div className="h-fit w-fit overflow-hidden rounded">
            <Image
              alt={data.name}
              src={
                process.env.NEXT_PUBLIC_SUPABASE_URL +
                "/storage/v1/object/public/public_files/" +
                data.images[0]
              }
              width={60}
              height={60}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-3 max-w-36 overflow-ellipsis sm:w-20">
          {data.name}
        </div>
      );
    },
  },
  {
    accessorKey: "brand",
    header: "Hãng",
    cell: ({ row }) => {
      const data = row.original;

      return <div className="max-w-32">{data.brand}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => {
      const data = row.original;

      return <div className="">{formatCurrency(data.price)}</div>;
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
      const session = useSession() as SessionState;
      const router = useRouter();

      const handleRemove = useCallback(async () => {
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
      }, [product, session]);

      const handleViewProduct = useCallback(() => {
        router.push("/product/" + product.id);
      }, [product.id, router]);

      const handleEditProduct = useCallback(() => {
        router.push("/dashboard/product/" + product.id);
      }, [product.id, router]);

      return (
        <div className="flex w-full items-center justify-center">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <ArrowUpRight onClick={handleViewProduct} className="h-4 w-4" />
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
              <DropdownMenuItem onClick={handleEditProduct}>
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRemove}>
                Xóa sản phẩm
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
