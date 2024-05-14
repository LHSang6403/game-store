"use client";

import {
  columns,
  columns_headers,
} from "@app/(protected)/dashboard/product/Components/Columns";
import { DataTable } from "@components/Table/DataTable";
import Link from "next/link";
import { readProducts } from "@/app/_actions/product";
import { ProductType } from "@utils/types/index";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data: products } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => readProducts({ limit: 100, offset: 0 }),
    staleTime: 3600 * 60,
  });

  return (
    <section className="w-full overflow-auto">
      <div className="flex flex-row items-center justify-between">
        <h1 className="my-2 text-2xl font-medium">Tất cả sản phẩm</h1>
        <Link
          className="hover:text-accent-foreground focus:text-accent-foreground flex h-9 w-fit items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          href="/dashboard/product/create"
        >
          Tạo mới
        </Link>
      </div>
      <div className="w-full overflow-hidden">
        <DataTable
          columns={columns}
          data={products?.data ?? ([] as ProductType[])}
          isPaginationEnabled={true}
          columns_headers={columns_headers}
          searchPlaceholder="Tên sản phẩm..."
        />
      </div>
    </section>
  );
}
