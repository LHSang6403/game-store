import { readOrders } from "@app/(protected)/dashboard/_actions/order";
import Link from "next/link";
import { OrderType } from "@/utils/types";

export default async function page() {
  const res = await readOrders({ limit: 10, offset: 0 });
  const data = res.data as OrderType[];

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

      {/* <DataTable columns={columns} data={data} isPaginationEnabled={false} /> */}
    </section>
  );
}
