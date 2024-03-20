import { readStaffs } from "@app/_actions/user";
import Link from "next/link";
import { StaffType } from "@/utils/types";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "./Components/Columns";
import { ApiErrorHandlerServer } from "@/utils/errorHandler/apiErrorHandler";

export default async function page() {
  const unprocessedResponse = await readStaffs({ limit: 20, offset: 0 });
  const response = ApiErrorHandlerServer<StaffType[]>({
    response: unprocessedResponse,
  });

  return (
    <section className="">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="my-2 text-2xl font-medium">All staff</h1>
        <Link
          className="hover:text-accent-foreground focus:text-accent-foreground flex h-9 w-fit items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          href="/dashboard/order/create"
        >
          Create
        </Link>
      </div>
      {response.data && (
        <DataTable
          columns={columns}
          data={response.data}
          isPaginationEnabled={true}
        />
      )}
    </section>
  );
}
