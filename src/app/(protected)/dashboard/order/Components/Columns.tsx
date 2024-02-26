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
import type { OrderType } from "@utils/types";
import formatCurrency from "@utils/functions/formatCurrency";
import { toast } from "sonner";
import { updateStateOrder } from "@/app/_actions/order";

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "prod_names",
    header: "Products",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-5 w-52 overflow-ellipsis sm:w-36">
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
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const data = row.original;
      return <div className="">{formatCurrency(data.price)} VND</div>;
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return <div className="w-28 text-center">State</div>;
    },
    cell: ({ row }) => {
      const data = row.original;

      const handleUpdateRole = async (
        newState: "pending" | "shipping" | "delivered" | "canceled" | "returned"
      ) => {
        toast.promise(
          async () => {
            const result = await updateStateOrder({
              id: data.id,
              state: newState,
            });
            console.log(result);
          },
          {
            loading: "Updating role...",
            success: "Role updated successfully.",
            error: "Failed to update role. Please try again.",
          }
        );
      };

      return (
        <Select
          defaultValue={data.state ?? "Unknown"}
          onValueChange={(
            value:
              | "pending"
              | "shipping"
              | "delivered"
              | "canceled"
              | "returned"
          ) => {
            handleUpdateRole(value);
          }}
        >
          <SelectTrigger className="w-28 border-none">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>State</SelectLabel>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipping">Shipping</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          className="border-none"
          variant="outline"
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
    accessorKey: "customer_name",
    header: "Customer",
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
              Copy order ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
