"use client";

import {
  columns,
  columns_headers,
} from "@/app/(protected)/dashboard/product/_components/Columns";
import { DataTable } from "@components/Table/DataTable";
import { readProducts } from "@/app/_actions/product";
import { ProductType } from "@utils/types/index";
import { useQuery } from "@tanstack/react-query";
import DashboardTableLoading from "@/app/(protected)/dashboard/_components/DashboardTableLoading";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const {
    data: products,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => readProducts({ limit: 200, offset: 0 }),
    staleTime: 60 * (60 * 1000),
  });

  return (
    <section className="w-full overflow-auto">
      <div className="flex flex-row items-center justify-between">
        <h1 className="my-2 text-2xl font-medium">Tất cả sản phẩm</h1>
        <button
          onClick={() => router.push("/dashboard/product/create")}
          className="hover:text-accent-foreground focus:text-accent-foreground flex h-9 w-fit items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
        >
          Tạo mới
        </button>
      </div>
      <div className="w-full overflow-hidden">
        {isLoading ? (
          <DashboardTableLoading />
        ) : (
          <>
            {isSuccess && products.data && (
              <DataTable
                columns={columns}
                data={products.data as ProductType[]}
                isPaginationEnabled={true}
                columns_headers={columns_headers}
                searchPlaceholder="Tên sản phẩm..."
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
