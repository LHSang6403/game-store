import { User, columns } from "@components/Table/Column";
import { DataTable } from "@components/Table/DataTable";
import Link from "next/link";

async function getUsers(): Promise<User[]> {
  const res = await fetch(
    "https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users"
  );
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await getUsers();

  return (
    <section className="mx-10 sm:mx-4">
      <h1 className="my-2 text-2xl font-medium">All products</h1>
      <Link href="/dashboard/product/create">Create</Link>
      <DataTable columns={columns} data={data} />
    </section>
  );
}
