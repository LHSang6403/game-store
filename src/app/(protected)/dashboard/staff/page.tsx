"use client";

import { readStaffs } from "@app/_actions/user";
import { StaffType } from "@/utils/types";
import { DataTable } from "@components/Table/DataTable";
import {
  columns,
  columns_headers,
} from "@app/(protected)/dashboard/staff/Components/Columns";
import { useQuery } from "@tanstack/react-query";
import DashboardTableLoading from "@app/(protected)/dashboard/Components/DashboardTableLoading";

export default function page() {
  const {
    data: staffs,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["staffs", "all"],
    queryFn: () => readStaffs({ limit: 100, offset: 0 }),
    staleTime: 60 * (60 * 1000),
  });

  return (
    <section className="">
      <h1 className="my-2 text-2xl font-medium">Tất cả nhân viên</h1>
      {isLoading ? (
        <DashboardTableLoading />
      ) : (
        <>
          {isSuccess && staffs.data && (
            <DataTable
              columns={columns}
              data={staffs.data as StaffType[]}
              isPaginationEnabled={true}
              searchPlaceholder="Họ tên..."
              columns_headers={columns_headers}
            />
          )}
        </>
      )}
    </section>
  );
}
