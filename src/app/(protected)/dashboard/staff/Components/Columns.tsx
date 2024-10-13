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
import type { StaffRole, StaffType } from "@utils/types";
import { updateStaffRole } from "@/app/_actions/user";
import { toast } from "sonner";
import { updateStaffToCustomer } from "@/app/_actions/user";
import { useSession, SessionState } from "@/zustand/useSession";
import EditProfile from "@app/(main)/profile/Components/EditProfile";
import formatVNDate from "@/utils/functions/formatVNDate";
import { useCallback } from "react";

export const columns_headers = [
  { accessKey: "index", name: "STT" },
  { accessKey: "name", name: "Họ tên" },
  { accessKey: "dob", name: "Ngày sinh" },
  { accessKey: "phone", name: "SĐT" },
  { accessKey: "role", name: "Vai trò" },
  { accessKey: "Actions", name: "Hành động" },
];

export const columns: ColumnDef<StaffType>[] = [
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
        <div className="-ml-4 flex w-32 items-center justify-center border-none">
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
      const data = row.original;
      const date = new Date(data.dob);
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
    accessorKey: "role",
    header: () => {
      return <div className="ml-2 w-fit text-left">Vai trò</div>;
    },
    cell: ({ row }) => {
      const data = row.original;
      const session = useSession() as SessionState;

      const handleUpdateRole = useCallback(
        async (newRole: StaffRole) => {
          toast.promise(
            async () => {
              if (!session.session)
                throw new Error("Không thể xác định phiên đăng nhập.");

              const result = await updateStaffRole({
                staff: data,
                updatedRole: newRole,
                actor: {
                  actorId: session.session?.id,
                  actorName: session.session?.name,
                },
              });

              if (result.error) throw new Error(result.error);
            },
            {
              success: "Cập nhật vai trò thành công.",
              loading: "Đang cập nhật...",
              error: (error: any) => {
                return error.message;
              },
            }
          );
        },
        [data, session.session]
      );

      return (
        <Select
          defaultValue={data.role ?? "Không rõ"}
          onValueChange={(value: StaffRole) => {
            handleUpdateRole(value);
          }}
        >
          <SelectTrigger className="w-28 border-none">
            <SelectValue placeholder="Chọn vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Nhân viên</SelectLabel>
              <SelectItem value="Bán hàng">Bán hàng</SelectItem>
              <SelectItem value="Biên tập">Biên tập</SelectItem>
              <SelectItem value="Quản lý">Quản lý</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "Actions",
    header: () => {
      return <div className="w-full text-center">Hành động</div>;
    },
    cell: ({ row }) => {
      const data = row.original;
      const session = useSession() as SessionState;

      const updateStaffToCustomerHandler = useCallback(
        async (staff: StaffType) => {
          toast.promise(
            async () => {
              if (!session.session)
                throw new Error("Không thể xác định phiên đăng nhập.");

              const result = await updateStaffToCustomer({
                staff: staff,
                actor: {
                  actorId: session.session.id,
                  actorName: session.session.name,
                },
              });

              if (result.error) throw new Error(result.error);
            },
            {
              success: "Chuyển thành khách hàng thành công.",
              loading: "Đang cập nhật...",
              error: (error: any) => {
                return error.message;
              },
            }
          );
        },
        [session.session]
      );

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
                Sao chép ID nhân viên
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateStaffToCustomerHandler(data)}
              >
                Chuyển thành khách hàng
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditProfile profile={data} />
        </div>
      );
    },
  },
];
