import CreateForm from "@/app/(protected)/dashboard/order/create/Components/CreateForm";
import { readProductsWithDetail } from "@/app/_actions/product";
import { readCustomers } from "@app/_actions/user";
import { readStorages } from "@app/_actions/storage";

export default async function page() {
  const products = await readProductsWithDetail();
  const customers = await readCustomers({
    limit: 40,
    offset: 0,
  });
  const storages = await readStorages();

  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-2 pb-6">
      <h1 className="my-2 text-2xl font-medium">Tạo đơn hàng</h1>
      <div className="h-fit w-full">
        {customers.data && products.data && storages.data && (
          <CreateForm
            storages={storages.data}
            customers={customers.data}
            products={products.data}
          />
        )}
      </div>
    </div>
  );
}
