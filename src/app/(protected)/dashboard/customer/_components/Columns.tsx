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
import { CustomerType, StaffRole } from "@utils/types";
import { updateCustomerToStaff } from "@/app/_actions/user";
import { toast } from "sonner";
import { updateCustomerLevel } from "@app/_actions/user";
import { useSession, SessionState } from "@/zustand/useSession";
import EditProfile from "@/app/(main)/profile/_components/EditProfile";
import formatVNDate from "@/utils/functions/formatVNDate";
import { useCallback } from "react";

export const columns_headers = [
  { accessKey: "index", name: "STT" },
  { accessKey: "name", name: "Họ tên" },
  { accessKey: "dob", name: "Ngày sinh" },
  { accessKey: "phone", name: "SĐT" },
  { accessKey: "address", name: "Địa chỉ" },
  { accessKey: "level", name: "Điểm" },
  { accessKey: "actions", name: "Hành động" },
];

export const columns: ColumnDef<CustomerType>[] = [
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
    header: "Họ tên",
  },
  {
    accessorKey: "dob",
    header: ({ column }) => {
      return (
        <div className="center -ml-4 w-32 border-none">
          <Button
            variant="outline"
            className="border-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ngày sinh
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("dob"));
      const formatted = formatVNDate(date);

      return (
        <>
          {row.getValue("dob") ? (
            <div className="w-32 text-left">{formatted}</div>
          ) : (
            <div className="">Không rõ</div>
          )}
        </>
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
      const session = useSession() as SessionState;

      const handleUpdateCustomerLevel = useCallback(
        (customer: CustomerType, newLevel: number) => {
          toast.promise(
            async () => {
              if (!session.session)
                throw new Error("Không xác định phiên đăng nhập.");

              const result = await updateCustomerLevel({
                customer: customer,
                newLevel: newLevel,
                actor: {
                  actorId: session.session.id,
                  actorName: session.session.name,
                },
              });

              if (result.error) throw new Error(result.error);
            },
            {
              success: "Cập nhật thành công!",
              loading: "Đang cập nhật...",
              error: (error: any) => {
                return error.message;
              },
            }
          );
        },
        [session]
      );

      const handleUpdateCustomerToStaff = useCallback(
        (customer: CustomerType, staffRole: StaffRole) => {
          toast.promise(
            async () => {
              if (!session.session)
                throw new Error("Không xác định phiên đăng nhập.");

              const result = await updateCustomerToStaff({
                customer: customer,
                role: staffRole,
                actor: {
                  actorId: session.session.id,
                  actorName: session.session.name,
                },
              });

              if (result.error) throw new Error(result.error);
            },
            {
              success: "Cập nhật thành công!",
              loading: "Đang cập nhật...",
              error: (error: any) => {
                return error.message;
              },
            }
          );
        },
        [session]
      );

      return (
        <div className="center w-full sm:flex-col">
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
                  handleUpdateCustomerLevel(data, data.level + 1);
                }}
              >
                Nâng cấp điểm
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleUpdateCustomerToStaff(data, StaffRole.Seller);
                }}
              >
                Cập nhật thành Bán hàng
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleUpdateCustomerToStaff(data, StaffRole.Writer);
                }}
              >
                Cập nhật thành Biên tập
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleUpdateCustomerToStaff(data, StaffRole.Manager);
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
