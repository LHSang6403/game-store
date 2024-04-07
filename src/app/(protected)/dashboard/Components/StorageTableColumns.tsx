"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductStorageType } from "@utils/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<ProductStorageType>[] = [
  {
    accessorKey: "product_name",
    header: "Sản phẩm",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-2 w-36 overflow-ellipsis text-left">
          {data.product_name}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          className="w-fit"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Có sẵn
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;

      return <div className="w-24 text-center">{data.quantity ?? 0}</div>;
    },
  },
  {
    id: "actions",
    header: "Xem",
    cell: ({ row }) => {
      const data = row.original;
      const router = useRouter();

      return (
        <Button variant="ghost" className="h-8 w-8 p-0">
          <ArrowUpRight
            onClick={() => router.push("/product/" + data.product_id)}
            className="h-4 w-4"
          />
        </Button>
      );
    },
  },
];
