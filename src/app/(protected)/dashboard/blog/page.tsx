"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@components/Table/DataTable";
import { columns, columns_headers } from "./_components/Columns";
import { readBlogs } from "@/app/_actions/blog";
import type { BlogType } from "@utils/types/index";
import { useQuery } from "@tanstack/react-query";
import DashboardTableLoading from "@/app/(protected)/dashboard/_components/DashboardTableLoading";

export default function page() {
  const router = useRouter();

  const {
    data: blogs,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["blogs", "all"],
    queryFn: () => readBlogs({ limit: 200, offset: 0 }),
    staleTime: 60 * (60 * 1000),
  });

  return (
    <section className="">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="my-2 text-2xl font-medium">Tất cả bài viết</h1>
        <button
          onClick={() => router.push("/dashboard/blog/create")}
          className="hover:text-accent-foreground focus:text-accent-foreground flex h-9 w-fit items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
        >
          Tạo bài viết
        </button>
      </div>
      {isLoading ? (
        <DashboardTableLoading />
      ) : (
        <>
          {isSuccess && blogs.data && (
            <DataTable
              columns={columns}
              data={blogs?.data as BlogType[]}
              isPaginationEnabled={true}
              searchAttribute="title"
              searchPlaceholder="Tiêu đề..."
              columns_headers={columns_headers}
            />
          )}
        </>
      )}
    </section>
  );
}
