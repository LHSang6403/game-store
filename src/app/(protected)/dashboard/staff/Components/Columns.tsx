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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StaffType } from "@utils/types";
import { updateStaffRole } from "@/app/_actions/user";
import { toast } from "sonner";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";

export const columns: ColumnDef<StaffType>[] = [
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
    accessorKey: "role",
    header: ({ column }) => {
      return <div className="w-28 text-center">Role</div>;
    },
    cell: ({ row }) => {
      const data = row.original;

      const handleUpdateRole = async (
        newRole: "Writer" | "Manager" | "Seller"
      ) => {
        toast.promise(
          async () => {
            const unprocessedResponse = await updateStaffRole({
              id: data.id,
              updatedRole: newRole,
            });

            const response = ApiErrorHandlerClient<any>({
              response: unprocessedResponse,
            });
          },
          {
            loading: "Updating role...",
            error: "Failed to update role. Please try again.",
          }
        );
      };

      return (
        <Select
          defaultValue={data.role ?? "Unknown"}
          onValueChange={(value: "Seller" | "Writer" | "Manager") => {
            handleUpdateRole(value);
          }}
        >
          <SelectTrigger className="w-28 border-none">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Staff</SelectLabel>
              <SelectItem value="Seller">Seller</SelectItem>
              <SelectItem value="Writer">Writer</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;

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
              Copy staff ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
