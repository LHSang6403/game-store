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
import type { CustomerType, StaffRole } from "@utils/types";
import { updateCustomerToStaff } from "@/app/_actions/user";
import { toast } from "sonner";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";
import { updateCustomerLevel } from "@app/_actions/user";
import { useSession } from "@/zustand/useSession";
import EditProfile from "@/app/(main)/profile/Components/EditProfile";
import formatVNDate from "@/utils/functions/formatVNDate";

export const columns_headers = [
  { accessKey: "name", name: "Họ tên" },
  { accessKey: "dob", name: "Ngày sinh" },
  { accessKey: "phone", name: "SĐT" },
  { accessKey: "address", name: "Địa chỉ" },
  { accessKey: "level", name: "Điểm" },
  { accessKey: "actions", name: "Hành động" },
];

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "name",
    header: "Họ tên",
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
          Ngày sinh
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("dob"));
      const formatted = formatVNDate(date);

      return (
        <div className="ml-2 text-left">
          {row.getValue("dob") ? formatted : "Không rõ"}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "SĐT",
    cell: ({ row }) => {
      const data = row.original;

      return <div className="text-left">{data.phone ?? "Không rõ"}</div>;
    },
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
    cell: ({ row }) => {
      const data = row.original;

      return <div className="text-left">{data.address ?? "Không rõ"}</div>;
    },
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
          Điểm
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
    header: () => {
      return <div className="w-full text-center">Hành động</div>;
    },
    cell: ({ row }) => {
      const data = row.original;
      const session = useSession();

      function updateCustomerLevelHandler(
        customer: CustomerType,
        newLevel: number
      ) {
        toast.promise(
          async () => {
            if (session.session) {
              const updateResponse = await updateCustomerLevel({
                customer: customer,
                newLevel: newLevel,
                actor: {
                  actorId: session.session.id,
                  actorName: session.session.name,
                },
              });

              ApiErrorHandlerClient({
                response: updateResponse,
              });
            }
          },
          {
            loading: "Updating...",
          }
        );
      }

      function updateCustomerToStaffHandler(
        customer: CustomerType,
        eachRole: StaffRole
      ) {
        toast.promise(
          async () => {
            if (session.session) {
              const updateResponse = await updateCustomerToStaff({
                customer: customer,
                role: eachRole,
                actor: {
                  actorId: session.session.id,
                  actorName: session.session.name,
                },
              });

              ApiErrorHandlerClient({
                response: updateResponse,
              });
            }
          },
          {
            loading: "Updating...",
          }
        );
      }

      return (
        <div className="flex w-full flex-row items-center justify-center sm:flex-col">
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
                Sao chép ID khách hàng
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  updateCustomerLevelHandler(data, data.level + 1);
                }}
              >
                Nâng cấp điểm
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  updateCustomerToStaffHandler(data, "Bán hàng");
                }}
              >
                Cập nhật thành Bán hàng
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  updateCustomerToStaffHandler(data, "Biên tập");
                }}
              >
                Cập nhật thành Biên tập
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  updateCustomerToStaffHandler(data, "Quản lý");
                }}
              >
                Cập nhật thành Quản lý
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditProfile profile={data} />
        </div>
      );
    },
  },
];
