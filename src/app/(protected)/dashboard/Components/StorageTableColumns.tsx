"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StorageType } from "@utils/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<StorageType>[] = [
  {
    accessorKey: "prod_name",
    header: "Sản phẩm",
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

      return <div className="mx-8 w-fit">{data.quantity}</div>;
    },
  },
  {
    accessorKey: "address",
    header: "Kho",
  },
];
