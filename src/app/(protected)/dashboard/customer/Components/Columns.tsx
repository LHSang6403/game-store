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
import type { CustomerType } from "@utils/types";
import { updateToStaff } from "@/app/_actions/user";
import { toast } from "sonner";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "dob",
    header: ({ column }) => {
      return (
        <Button
          variant="outline"
          className="border-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Birdthday
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("dob"));
      const formatted = date.toLocaleDateString();

      return <div className="ml-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "level",
    header: ({ column }) => {
      return (
        <Button
          variant="outline"
          className="w-24 border-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Level
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;

      return <div className="w-24 text-center">{data.level}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      const availbleRoles = ["Seller", "Writer", "Manager"];

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-3 h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.id)}
            >
              Copy customer ID
            </DropdownMenuItem>
            {(availbleRoles as ("Seller" | "Writer" | "Manager")[]).map(
              (eachRole, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() =>
                    toast.promise(
                      async () => {
                        const unprocessedResponse = await updateToStaff({
                          id: data.id,
                          role: eachRole,
                        });
                        
                        const response = ApiErrorHandlerClient({
                          response: unprocessedResponse,
                        });
                      },
                      {
                        loading: "Updating...",
                      }
                    )
                  }
                >
                  Update to {eachRole}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
