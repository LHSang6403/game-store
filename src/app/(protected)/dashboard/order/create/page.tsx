import CreateForm from "@app/(protected)/dashboard/order/create/Components/CreateForm";
import { readProductsWithDetail } from "@/app/_actions/product";
import { readCustomers } from "@app/_actions/user";

export default async function page() {
  const products = await readProductsWithDetail({
    limit: 40,
    offset: 0,
  });

  const customers = await readCustomers({
    limit: 40,
    offset: 0,
  });

  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-2 pb-6">
      <h1 className="my-2 text-2xl font-medium">Create order</h1>
      <div className="h-fit w-full">
        {customers.data && products.data && (
          <CreateForm
            customersData={customers.data}
            productsData={products.data}
          />
        )}
      </div>
    </div>
  );
}
