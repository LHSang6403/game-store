"use client";

import { ColumnDef } from "@tanstack/react-table";
import { OrderType } from "@utils/types";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import formatReadableTime from "@/utils/functions/formatTime";
import { cancelGHTKOrder } from "@/app/_actions/GHTKShipment";
import { cancelGHNOrder } from "@/app/_actions/GHNShipment";
import { toast } from "sonner";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "prod_names",
    header: "Products",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-5 w-80 overflow-ellipsis sm:w-36">
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

      async function cancelOrderHandler(data: OrderType) {
        toast.promise(
          async () => {
            switch (data.shipment_name) {
              case "GHN":
                const unprocessedResponseGHN = await cancelGHNOrder({
                  id: data.id,
                  order_codes: [data.shipment_label_code!],
                });

                const responseGHN = ApiErrorHandlerClient({
                  response: unprocessedResponseGHN,
                });

                break;

              case "GHTK":
                const unprocessedResponseGHTK = await cancelGHTKOrder({
                  id: data.id,
                  label: data.shipment_label_code!,
                });

                const responseGHTK = ApiErrorHandlerClient({
                  response: unprocessedResponseGHTK,
                });

                break;
            }
          },
          {
            loading: "Canceling order...",
          }
        );
      }

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
              {data.shipment_label_code && (
                <DropdownMenuItem
                  disabled={data.state !== "pending"}
                  onClick={() => {
                    cancelOrderHandler(data);
                  }}
                >
                  Cancel order
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
