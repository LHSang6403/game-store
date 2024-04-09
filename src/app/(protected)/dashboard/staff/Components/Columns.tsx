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
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";
import { updateStaffToCustomer } from "@/app/_actions/user";
import { useSession } from "@/zustand/useSession";
import EditProfile from "@app/(main)/profile/Components/EditProfile";
import formatVNDate from "@/utils/functions/formatVNDate";

export const columns_headers = [
  { accessKey: "name", name: "Họ tên" },
  { accessKey: "dob", name: "Ngày sinh" },
  { accessKey: "phone", name: "SĐT" },
  { accessKey: "role", name: "Vai trò" },
  { accessKey: "Actions", name: "Hành động" },
];

export const columns: ColumnDef<StaffType>[] = [
  {
    accessorKey: "name",
    header: "Họ tên",
  },
  {
    accessorKey: "dob",
    header: ({ column }) => {
      return (
        <div className="flex w-32 items-center justify-center border-none">
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
        <div className="w-32 text-center">
          {data.dob ? formatted : "Không rõ"}
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
    accessorKey: "role",
    header: () => {
      return <div className="ml-2 w-fit text-left">Vai trò</div>;
    },
    cell: ({ row }) => {
      const data = row.original;
      const session = useSession();

      const handleUpdateRole = async (newRole: StaffRole) => {
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
