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
import { updateStaffToCustomer } from "@/app/_actions/user";
import { useSession } from "@/zustand/useSession";
import EditProfile from "@app/(main)/profile/Components/EditProfile";
import formatVNDate from "@/utils/functions/formatVNDate";

export const columns: ColumnDef<StaffType>[] = [
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

      return <div className="ml-2 text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "SĐT",
  },
  {
    accessorKey: "role",
    header: () => {
      return <div className="ml-2 w-fit text-left">Vai trò</div>;
    },
    cell: ({ row }) => {
      const data = row.original;
      const session = useSession();

      const handleUpdateRole = async (
        newRole: "Writer" | "Manager" | "Seller"
      ) => {
        toast.promise(
          async () => {
            if (session.session) {
              const updateResponse = await updateStaffRole({
                staff: data,
                updatedRole: newRole,
                actor: {
                  actorId: session.session?.id,
                  actorName: session.session?.name,
                },
              });

              ApiErrorHandlerClient<any>({
                response: updateResponse,
              });
            }
          },
          {
            loading: "Đang cập nhật...",
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
            <SelectValue placeholder="Chọn vai trò" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Nhân viên</SelectLabel>
              <SelectItem value="Seller">Bán hàng</SelectItem>
              <SelectItem value="Writer">Biên tập</SelectItem>
              <SelectItem value="Manager">Quản lí</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
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

      function updateStaffToCustomerHandler(staff: StaffType) {
        toast.promise(
          async () => {
            if (session.session) {
              const updateResponse = await updateStaffToCustomer({
                staff: staff,
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
            loading: "Đang cập nhật...",
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
                Sao chép ID nhân viên
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  updateStaffToCustomerHandler(data);
                }}
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
