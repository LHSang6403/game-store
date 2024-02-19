"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OrderType } from "@utils/types";
import { Button } from "@components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import formatReadableTime from "@/utils/functions/formatTime";

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "prod_names",
    header: "Products",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="w-80 sm:w-36 line-clamp-5 overflow-ellipsis">
          {data.prod_names.map((name, index) => (
            <span key={index}>
              {name} {`(x${data.prod_quantities[index]})`}
              {index !== data.prod_names.length - 1 && ", "}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ordered at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="text-left">{formatReadableTime(data.created_at)}</div>
      );
    },
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => {
      const data = row.original;

      return <div className="text-center">{data.state}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="text-center">
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
              {/* <DropdownMenuSeparator /> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
