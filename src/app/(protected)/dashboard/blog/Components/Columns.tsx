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
import type { BlogType } from "@utils/types";
import Link from "next/link";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";
import { toast } from "sonner";
import { useSession } from "@/zustand/useSession";
import { deleteBlogById } from "@app/_actions/blog";

export const columns: ColumnDef<BlogType>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-2 max-w-52 overflow-ellipsis lg:line-clamp-3 lg:w-32">
          {data.description}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="outline"
          className="border-none"
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
    accessorKey: "writer",
    header: "Writer",
  },
  {
    id: "actions",
    header: "Actions",

    cell: ({ row }) => {
      const data = row.original;
      const session = useSession();

      async function removeHandler(blog: BlogType) {
        toast.promise(
          async () => {
            if (session.session) {
              const removeResponse = await deleteBlogById({
                blog: blog,
                actor: {
                  actorId: session.session.id,
                  actorName: session.session.name,
                },
              });

              const remove = ApiErrorHandlerClient({
                response: removeResponse,
              });
            }
          },
          {
            loading: "Removing blog...",
          }
        );
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-2 h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.id)}
            >
              Copy blog ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/dashboard/blog/" + data.id}>Edit blog</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => removeHandler(data)}>
              Remove blog
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
