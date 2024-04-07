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
import { cancelGHTKOrder } from "@/app/_actions/GHTKShipment";
import { cancelGHNOrder } from "@/app/_actions/GHNShipment";
import { toast } from "sonner";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";
import { useSession } from "@/zustand/useSession";
import formatVNDate from "@utils/functions/formatVNDate";

export const columns_headers = [
  { accessKey: "prod_names", name: "Sản phẩm" },
  { accessKey: "created_at", name: " Vào lúc" },
  { accessKey: "state", name: "Tình trạng" },
  { accessKey: "actions", name: "Hành động" },
];

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "prod_names",
    header: "Sản phẩm",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-5 w-80 overflow-ellipsis sm:w-36">
          {data.products.map((prod, index) => (
            <span key={index}>
              {prod.product.name}
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
          Vào lúc
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formatted = formatVNDate(date);

      return <div className="ml-2 w-32 text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "state",
    header: "Tình trạng",
    cell: ({ row }) => {
      const data = row.original;

      return <div className="w-28 text-left">{data.state}</div>;
    },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => {
      const data = row.original;
      const session = useSession();

      async function cancelOrderHandler(data: OrderType) {
        toast.promise(
          async () => {
            switch (data.shipment_name) {
              case "GHN":
                if (session.session) {
                  const GHNResponse = await cancelGHNOrder({
                    order: data,
                    order_codes: [data.shipment_label_code!],
                    actor: {
                      actorId: session.session.id,
                      actorName: session.session.name,
                    },
                  });

                  ApiErrorHandlerClient({
                    response: GHNResponse,
                  });
                }

                break;

              case "GHTK":
                if (session.session) {
                  const GHTKResponse = await cancelGHTKOrder({
                    order: data,
                    label: data.shipment_label_code!,
                    actor: {
                      actorId: session.session.id,
                      actorName: session.session.name,
                    },
                  });

                  ApiErrorHandlerClient({
                    response: GHTKResponse,
                  });
                }

                break;
            }
          },
          {
            loading: "Đang hủy đơn...",
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
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(data.id)}
              >
                Sao chép ID đơn hàng
              </DropdownMenuItem>
              {data.shipment_label_code && (
                <DropdownMenuItem
                  disabled={data.state !== "Đang chờ"}
                  onClick={() => {
                    cancelOrderHandler(data);
                  }}
                >
                  Hủy đơn hàng
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
