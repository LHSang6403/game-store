"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import type { OrderType } from "@utils/types";
import formatCurrency from "@utils/functions/formatCurrency";
import { toast } from "sonner";
import { updateStateOrder } from "@app/_actions/order";
import { PrintDialog } from "./PrintDialog";
import { useState } from "react";
import { printGHNOrder } from "@/app/_actions/GHNShipment";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";
import { ShipmentState } from "@utils/types/index";
import { useSession } from "@/zustand/useSession";

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "products",
    header: "Sản phẩm",
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
    header: "Giá tiền",
    cell: ({ row }) => {
      const data = row.original;

      return <div className="">{formatCurrency(data.total_price)} VND</div>;
    },
  },
  {
    accessorKey: "state",
    header: () => {
      return <div className="w-28 text-center">Tình trạng</div>;
    },
    cell: ({ row }) => {
      const data = row.original;

      async function handleUpdateState(newState: ShipmentState) {
        toast.promise(
          async () => {
            const session = useSession();

            if (session.session) {
              const updateResponse = await updateStateOrder({
                id: data.id,
                state: newState,
                actor: {
                  actorId: session.session?.id,
                  actorName: session.session?.name,
                },
              });

              ApiErrorHandlerClient({
                response: updateResponse,
              });
            }
          },
          {
            loading: "Đang cập nhật đơn hàng...",
          }
        );
      }
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
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tình trạng</SelectLabel>
              <SelectItem value="pending">Đang chờ</SelectItem>
              <SelectItem value="shipping">Đang giao</SelectItem>
              <SelectItem value="delivered">Đã giao</SelectItem>
              <SelectItem value="canceled">Đã hủy</SelectItem>
              <SelectItem value="returned">Đã trả hàng</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "ship",
    header: "Giao hàng",
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
          Ngày tạo
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
    header: "Khách hàng",
  },
  {
    id: "actions",
    header: "Hành động",
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
        const printResponse = await printGHNOrder({
          order_codes: [label_code],
          size: size,
        });

        const print = ApiErrorHandlerClient({
          response: printResponse,
          isShowToast: false,
        });

        setPrintResult(print.data);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-3 h-8 w-8 p-0">
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
                In khổ A5
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
                In khổ A6
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
                In khổ 80x80
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
                In khổ 52x70
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
