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
import { PrintDialog } from "./PrintDialog";
import { useState } from "react";
import { printGHNOrder } from "@/app/_actions/GHNShipment";

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "name",
    header: "Products",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-5 w-52 overflow-ellipsis sm:w-36">
          {data.products.map((prod, index) => (
            <span key={index}>
              {prod.name}
              {index !== data.products.length - 1 && ", "}
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
      return <div className="">{formatCurrency(data.total_price)} VND</div>;
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return <div className="w-28 text-center">State</div>;
    },
    cell: ({ row }) => {
      const data = row.original;

      const handleUpdateState = async (
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
            handleUpdateState(value);
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
    accessorKey: "ship",
    header: "Ship",
    cell: ({ row }) => {
      const data = row.original;
      return <div className="">{data.shipment_name}</div>;
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
      const [isPrintOpen, setIsPrintOpen] = useState(false);
      const [printResult, setPrintResult] = useState("");

      const printHandler = async ({
        label_code,
        size,
      }: {
        label_code: string;
        size: "A5" | "80x80" | "52x70";
      }) => {
        const printResult = await printGHNOrder({
          order_codes: [label_code],
          size: size,
        });
        setPrintResult(printResult);
      };

      return (
        <>
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
              <DropdownMenuItem
                disabled={data.shipment_name == "GHTK"} // because do not have api for this
                onClick={() => {
                  setIsPrintOpen(!isPrintOpen);
                  printHandler({
                    label_code: data.shipment_label_code!,
                    size: "A5",
                  });
                }}
              >
                Print A5
              </DropdownMenuItem>
              {/* <DropdownMenuItem // only GHTK have siza A6
                disabled={data.shipment_name == "GHN"} 
                onClick={() => {
                  setIsPrintOpen(!isPrintOpen);
                  printHandler({
                    label_code: data.shipment_label_code!,
                    size: "A5",
                  });
                }}
              >
                Print A6
              </DropdownMenuItem> */}
              <DropdownMenuItem
                disabled={data.shipment_name == "GHTK"}
                onClick={() => {
                  setIsPrintOpen(!isPrintOpen);
                  printHandler({
                    label_code: data.shipment_label_code!,
                    size: "80x80",
                  });
                }}
              >
                Print 80x80
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={data.shipment_name == "GHTK"}
                onClick={() => {
                  setIsPrintOpen(!isPrintOpen);
                  printHandler({
                    label_code: data.shipment_label_code!,
                    size: "52x70",
                  });
                }}
              >
                Print 52x70
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <PrintDialog
            content={printResult.toString()}
            isOpen={isPrintOpen}
            onOpenChange={(value) => {
              setIsPrintOpen(value);
            }}
          />
        </>
      );
    },
  },
];
