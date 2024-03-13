import { columns } from "@app/(protected)/dashboard/product/Components/Columns";
import { DataTable } from "@components/Table/DataTable";
import Link from "next/link";
import { readProducts } from "@/app/_actions/product";
import type { ProductType } from "@utils/types/index";
import { ApiErrorHandlerServer } from "@utils/errorHandler/apiErrorHandler";

export default async function Page() {
  const response = ApiErrorHandlerServer<ProductType[]>({
    response: await readProducts({ limit: 20, offset: 0 }),
  });

  return (
    <section className="">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="my-2 text-2xl font-medium">All products</h1>
        <Link
          className="hover:text-accent-foreground focus:text-accent-foreground flex h-9 w-fit items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          href="/dashboard/product/create"
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
