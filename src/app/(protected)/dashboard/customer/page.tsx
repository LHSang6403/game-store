"use client";

import { readCustomers } from "@app/_actions/user";
import { CustomerType } from "@/utils/types";
import { DataTable } from "@components/Table/DataTable";
import {
  columns,
  columns_headers,
} from "@/app/(protected)/dashboard/customer/_components/Columns";
import { useQuery } from "@tanstack/react-query";
import DashboardTableLoading from "@/app/(protected)/dashboard/_components/DashboardTableLoading";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  const {
    data: customers,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["customers", "all"],
    queryFn: () => readCustomers({ limit: 200, offset: 0 }),
    staleTime: 60 * (60 * 1000),
  });

  return (
    <section className="">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="my-2 text-2xl font-medium">Tất cả khách hàng</h1>
        <button
          onClick={() => router.push("/dashboard/customer/create")}
          className="hover:text-accent-foreground focus:text-accent-foreground flex h-9 w-fit items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
        >
          Tạo tài khoản mới
        </button>
      </div>
      <div>
        {isLoading ? (
          <DashboardTableLoading />
        ) : (
          <>
            {isSuccess && customers.data && (
              <DataTable
                columns={columns}
                data={customers?.data as CustomerType[]}
                isPaginationEnabled={true}
                searchPlaceholder="Họ tên..."
                columns_headers={columns_headers}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
