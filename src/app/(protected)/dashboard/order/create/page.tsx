import CreateForm from "@app/(protected)/dashboard/order/create/Components/CreateForm";
import { readProductsWithDetail } from "@/app/_actions/product";
import { ProductType, CustomerType, ProductDescriptionType, ProductWithDescriptionAndStorageType } from "@utils/types/index";
import { ApiErrorHandlerServer } from "@utils/errorHandler/apiErrorHandler";
import { readCustomers } from "@app/_actions/user";

export default async function page() {
  const unprocessedProductsResponse = await readProductsWithDetail({
    limit: 40,
    offset: 0,
  });
  const productsResponse = ApiErrorHandlerServer<ProductWithDescriptionAndStorageType[]>({
    response: unprocessedProductsResponse,
  });

  const unprocessedCustomersResponse = await readCustomers({
    limit: 40,
    offset: 0,
  });
  const customersResponse = ApiErrorHandlerServer<CustomerType[]>({
    response: unprocessedCustomersResponse,
  });

  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-2 pb-6">
      <h1 className="my-2 text-2xl font-medium">Create order</h1>
      <div className="h-fit w-full">
        {customersResponse.data && productsResponse.data && (
          <CreateForm
            customersData={customersResponse.data}
            productsData={productsResponse.data}
          />
        )}
      </div>
    </div>
  );
}
