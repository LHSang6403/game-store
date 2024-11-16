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
import { LogType } from "@/utils/types";
import formatVNDate from "@/utils/functions/formatVNDate";

export const columns_headers = [
  { accessKey: "index", name: "STT" },
  { accessKey: "name", name: "Tên" },
  { accessKey: "created_at", name: "Ngày tạo" },
  { accessKey: "actor_name", name: "Thực hiện bởi" },
  { accessKey: "result", name: "Kết quả" },
  { accessKey: "actions", name: "Hành động" },
];

export const columns: ColumnDef<LogType>[] = [
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
    accessorKey: "name",
    header: "Tên",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-3 w-32 overflow-ellipsis md:line-clamp-2 md:w-auto md:max-w-52">
          {data.name}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="center w-32 border-none">
          <Button
            className="border-none"
            variant="outline"
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
    accessorKey: "actor_name",
    header: "Thực hiện bởi",
  },
  {
    accessorKey: "result",
    header: ({ column }) => {
      return (
        <Button
          className="border-none"
          variant="outline"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kết quả
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return <div className="ml-4">{data.result}</div>;
    },
  },
  {
    id: "actions",
    header: () => {
      return <div className="w-full text-center">Hành động</div>;
    },
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="center w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(data.id)}
              >
                Sao chép ID hoạt động
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
