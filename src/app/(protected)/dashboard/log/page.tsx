"use client";

import { readLogs } from "@app/_actions/log";
import { LogType } from "@utils/types";
import { DataTable } from "@components/Table/DataTable";
import {
  columns,
  columns_headers,
} from "@/app/(protected)/dashboard/log/_components/Columns";
import { useQuery } from "@tanstack/react-query";
import DashboardTableLoading from "@/app/(protected)/dashboard/_components/DashboardTableLoading";

export default function page() {
  const {
    data: logs,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["logs", "all"],
    queryFn: () => readLogs(),
    staleTime: 60 * (60 * 1000),
  });

  return (
    <section className="">
      <h1 className="my-2 text-2xl font-medium">Tất cả lịch sử hoạt động</h1>
      <div>
        {isLoading ? (
          <DashboardTableLoading />
        ) : (
          <>
            {isSuccess && logs.data && (
              <DataTable
                columns={columns}
                data={logs.data as LogType[]}
                isPaginationEnabled={true}
                searchPlaceholder="Tên hoạt động..."
                columns_headers={columns_headers}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
