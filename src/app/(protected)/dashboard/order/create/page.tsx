import CreateForm from "@app/(protected)/dashboard/order/create/Components/CreateForm";
import { readProductsWithDetail } from "@/app/_actions/product";
import {
  CustomerType,
  ProductWithDescriptionAndStorageType,
} from "@utils/types/index";
import { ApiErrorHandlerServer } from "@utils/errorHandler/apiErrorHandler";
import { readCustomers } from "@app/_actions/user";

export default async function page() {
  const productsResponse = await readProductsWithDetail({
    limit: 40,
    offset: 0,
  });
  const products = ApiErrorHandlerServer<
    ProductWithDescriptionAndStorageType[]
  >({
    response: productsResponse,
  });

  const customersResponse = await readCustomers({
    limit: 40,
    offset: 0,
  });
  const customers = ApiErrorHandlerServer<CustomerType[]>({
    response: customersResponse,
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
