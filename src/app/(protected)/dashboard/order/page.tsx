"use client";

import { readOrders } from "@app/_actions/order";
import { OrderType } from "@utils/types";
import { DataTable } from "@components/Table/DataTable";
import {
  columns,
  columns_headers,
} from "@/app/(protected)/dashboard/order/_components/Columns";
import { useQuery } from "@tanstack/react-query";
import DashboardTableLoading from "@/app/(protected)/dashboard/_components/DashboardTableLoading";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  const {
    data: orders,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["orders", "all"],
    queryFn: () => readOrders({ limit: 200, offset: 0 }),
    staleTime: 60 * (60 * 1000),
  });

  return (
    <section className="">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="my-2 text-2xl font-medium">Tất cả đơn hàng</h1>
        <button
          onClick={() => router.push("/dashboard/order/create")}
          className="hover:text-accent-foreground focus:text-accent-foreground flex h-9 w-fit items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
        >
          Tạo đơn
        </button>
      </div>
      <div>
        {isLoading ? (
          <DashboardTableLoading />
        ) : (
          <>
            {isSuccess && orders.data && (
              <DataTable
                columns={columns}
                data={orders.data as OrderType[]}
                isPaginationEnabled={true}
                searchAttribute="customer_name"
                columns_headers={columns_headers}
                searchPlaceholder="Tên khách hàng..."
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
