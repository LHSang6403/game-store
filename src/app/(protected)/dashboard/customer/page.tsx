import { readCustomers } from "@app/_actions/user";
import Link from "next/link";
import { CustomerType } from "@/utils/types";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "./Components/Columns";
import { ApiErrorHandlerServer } from "@/utils/errorHandler/apiErrorHandler";

export default async function page() {
  const customersResponse = await readCustomers({ limit: 40, offset: 0 });
  const customers = ApiErrorHandlerServer<CustomerType[]>({
    response: customersResponse,
  });

  return (
    <section className="">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="my-2 text-2xl font-medium">All customers</h1>
        <Link
          className="hover:text-accent-foreground focus:text-accent-foreground flex h-9 w-fit items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          href="/dashboard/customer/create"
        >
          Create
        </Link>
      </div>
      {customers?.data && (
        <DataTable
          columns={columns}
          data={customers?.data}
          isPaginationEnabled={true}
        />
      )}
    </section>
  );
}
