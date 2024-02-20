import { columns } from "./Components/Columns";
import { DataTable } from "@components/Table/DataTable";
import Link from "next/link";
import { readProducts } from "@app/(main)/product/_actions/product";
import type { ProductType } from "@utils/types/index";

export default async function Page() {
  const res = await readProducts({ limit: 10, offset: 0 });
  const data = res.data as ProductType[];

  return (
    <section className="mx-10 sm:mx-4">
      <h1 className="my-2 text-2xl font-medium">All products</h1>
      <Link href="/dashboard/product/create">Create</Link>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
