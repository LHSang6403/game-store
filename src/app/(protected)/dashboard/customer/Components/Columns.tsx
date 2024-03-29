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
import type { CustomerType } from "@utils/types";
import { updateCustomerToStaff } from "@/app/_actions/user";
import { toast } from "sonner";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";
import { updateCustomerLevel } from "@app/_actions/user";
import { useSession } from "@/zustand/useSession";
import EditProfile from "@/app/(main)/profile/Components/EditProfile";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
          Birdthday
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("dob"));
      const formatted = date.toLocaleDateString();

      return <div className="ml-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
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
          Level
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
      return <div className="pr-4 text-center lg:pr-0">Actions</div>;
    },
    cell: ({ row }) => {
      const data = row.original;
      const availbleRoles = ["Seller", "Writer", "Manager"];
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
        eachRole: "Seller" | "Writer" | "Manager"
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
        <div className="flex w-full flex-row items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-3 h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(data.id)}
              >
                Copy customer ID
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  updateCustomerLevelHandler(data, data.level + 1);
                }}
              >
                Update level
              </DropdownMenuItem>
              {(availbleRoles as ("Seller" | "Writer" | "Manager")[]).map(
                (eachRole, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => {
                      updateCustomerToStaffHandler(data, eachRole);
                    }}
                  >
                    Update to {eachRole}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <EditProfile profile={data} />
        </div>
      );
    },
  },
];
