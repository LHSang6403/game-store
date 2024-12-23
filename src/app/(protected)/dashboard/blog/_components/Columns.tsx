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
import { BlogType } from "@utils/types";
import { toast } from "sonner";
import { useSession, SessionState } from "@/zustand/useSession";
import { deleteBlogById } from "@app/_actions/blog";
import formatVNDate from "@utils/functions/formatVNDate";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCallback } from "react";

export const columns_headers = [
  { accessKey: "index", name: "STT" },
  { accessKey: "image", name: "Hình ảnh" },
  { accessKey: "title", name: "Tiêu đề" },
  // { accessKey: "description", name: "Mô tả" },
  { accessKey: "created_at", name: "Ngày tạo" },
  { accessKey: "writer", name: "Tác giả" },
  { accessKey: "actions", name: "Hành động" },
];

export const columns: ColumnDef<BlogType>[] = [
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
    accessorKey: "image",
    header: () => {
      return <div className="text-center">Hình ảnh</div>;
    },
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-3 flex justify-center overflow-ellipsis">
          <div className="h-fit w-fit overflow-hidden rounded">
            <Image
              alt={data.title}
              src={
                process.env.NEXT_PUBLIC_SUPABASE_BUCKET_PATH +
                data.thumbnails[0]
              }
              width={60}
              height={60}
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Tiêu đề",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-3 w-32 overflow-ellipsis md:line-clamp-2 md:w-auto md:max-w-72">
          {data.title}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "description",
  //   header: "Mô tả",
  //   cell: ({ row }) => {
  //     const data = row.original;

  //     return (
  //       <div className="line-clamp-2 max-w-52 overflow-ellipsis lg:line-clamp-3 lg:w-32">
  //         {data.description}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="center w-32 border-none">
          <Button
            variant="outline"
            className="border-none"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ngày tạo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formatted = formatVNDate(date);

      return <div className="w-32 text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "writer",
    header: "Tác giả",
  },
  {
    id: "actions",
    header: () => {
      return <div className="w-full text-center">Hành động</div>;
    },
    cell: ({ row }) => {
      const router = useRouter();
      const data = row.original;
      const session = useSession() as SessionState;

      const handleRemove = useCallback(
        async (blog: BlogType) => {
          toast.promise(
            async () => {
              if (!session.session)
                throw new Error("Không thể xác định phiên đăng nhập.");

              const result = await deleteBlogById({
                blog: blog,
                actor: {
                  actorId: session.session.id,
                  actorName: session.session.name,
                },
              });

              if (result.error) throw new Error(result.error);
            },
            {
              success: "Xóa bài viết thành công",
              loading: "Đang xóa bài viết...",
              error: (error: any) => {
                return error.message;
              },
            }
          );
        },
        [session]
      );

      const handleCopyId = useCallback(() => {
        navigator.clipboard.writeText(data.id);
      }, [data.id]);

      const handleEdit = useCallback(() => {
        router.push("/dashboard/blog/" + data.id);
      }, [data.id, router]);

      return (
        <div className="center w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleCopyId}>
                Sao chép ID bài viết
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEdit}>
                Chỉnh sửa bài viết
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRemove(data)}>
                Xóa bài viết
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
