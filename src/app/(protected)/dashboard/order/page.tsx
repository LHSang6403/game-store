import { readOrders } from "@app/_actions/order";
import Link from "next/link";
import { OrderType } from "@utils/types";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "@app/(protected)/dashboard/order/Components/Columns";

export default async function page() {
  const res = await readOrders({ limit: 20, offset: 0 });
  if (res.error) throw new Error(res.error.message);

  const data = res.data as OrderType[];

  return (
    <section className="mx-10 sm:mx-4">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="my-2 text-2xl font-medium">All orders</h1>
        <Link
          className="mx-4 hover:cursor-pointer"
          href="/dashboard/order/create"
        >
          Create
        </Link>
      </div>
      <DataTable columns={columns} data={data} isPaginationEnabled={false} />
    </section>
  );
}
