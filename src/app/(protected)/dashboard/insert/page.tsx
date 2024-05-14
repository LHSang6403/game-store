import { readStorages } from "@app/_actions/storage";
import { readAllProductStorages } from "@/app/_actions/product_storage";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import SelectionLists from "./Components/SelectionLists";

export default async function page() {
  const storages = await readStorages();
  const productStorages = await readAllProductStorages();

  return (
    <section className="flex flex-col gap-4 lg:flex-col lg:pb-4 sm:pb-2">
      <div className="flex flex-col">
        <h1 className="mt-2 text-2xl font-medium">Nhập thêm sản phẩm</h1>
        <Link
          href="/dashboard/product/create"
          className="flex w-fit flex-row items-center text-sm font-medium text-foreground/90 hover:text-foreground"
        >
          Nhập mới sản phẩm
          <ChevronsRight className="h-4 w-4" />
        </Link>
      </div>
      {storages.data && productStorages.data && (
        <SelectionLists
          storages={storages.data}
          productStorages={productStorages.data}
        />
      )}
    </section>
  );
}
