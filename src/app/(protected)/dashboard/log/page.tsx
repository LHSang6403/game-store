import { readLogs } from "@app/_actions/log";
import { LogType } from "@utils/types";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "@app/(protected)/dashboard/log/Components/Columns";
import { ApiErrorHandlerServer } from "@utils/errorHandler/apiErrorHandler";

export default async function page() {
  const logsResponse = await readLogs();
  const logs = ApiErrorHandlerServer<LogType[]>({
    response: logsResponse,
  });

  return (
    <section className="">
      <h1 className="my-2 text-2xl font-medium">All logs</h1>
      {logs.data && (
        <DataTable
          columns={columns}
          data={logs.data}
          isPaginationEnabled={true}
        />
      )}
    </section>
  );
}
