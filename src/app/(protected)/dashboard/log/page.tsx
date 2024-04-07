import { readLogs } from "@app/_actions/log";
import { LogType } from "@utils/types";
import { DataTable } from "@components/Table/DataTable";
import {
  columns,
  columns_headers,
} from "@app/(protected)/dashboard/log/Components/Columns";

export default async function page() {
  const logs = await readLogs();

  return (
    <section className="">
      <h1 className="my-2 text-2xl font-medium">Tất cả lịch sử hoạt động</h1>
      {logs.data && (
        <DataTable
          columns={columns}
          data={logs.data as LogType[]}
          isPaginationEnabled={true}
          columns_headers={columns_headers}
        />
      )}
    </section>
  );
}
