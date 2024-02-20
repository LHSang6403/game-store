import { columns } from "./Components/Columns";
import { DataTable } from "@components/Table/DataTable";
import Link from "next/link";
import { readProducts } from "@app/(main)/product/_actions/product";
import type { ProductType } from "@utils/types/index";

export default async function Page() {
  const res = await readProducts({ limit: 10, offset: 0 });
  
  if (res.error) throw new Error(res.error.message);
  const data = res.data as ProductType[];

  return (
    <section className="mx-10 sm:mx-4">
      <div className="flex flex-row justify-between items-center ">
        <h1 className="my-2 text-2xl font-medium">All products</h1>
        <Link
          className="mx-4 hover:cursor-pointer"
          href="/dashboard/product/create"
        >
          Create
        </Link>
      </div>

      <DataTable columns={columns} data={data} isPaginationEnabled={false} />
    </section>
  );
}
