import Link from "next/link";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "./Components/Columns";
import { readBlogs } from "@/app/_actions/blog";
import type { BlogType } from "@utils/types/index";

export default async function page() {
  const blogs = await readBlogs({ limit: 20, offset: 0 });

  return (
    <section className="">
      <div className="flex flex-row items-center justify-between ">
        <h1 className="my-2 text-2xl font-medium">All blogs</h1>
        <Link
          className="hover:text-accent-foreground focus:text-accent-foreground flex h-9 w-fit items-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          href="/dashboard/blog/create"
        >
          Create
        </Link>
      </div>
      {blogs?.data && (
        <DataTable
          columns={columns}
          data={blogs?.data as BlogType[]}
          isPaginationEnabled={true}
          searchAttribute="title"
        />
      )}
    </section>
  );
}
