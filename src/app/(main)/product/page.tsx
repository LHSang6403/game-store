import SearchBar from "@components/Search/SearchBar";
import CategoryCards from "@app/(main)/product/Components/CategoryCards";
import ProductsContainer from "@app/(main)/product/Components/ProductsContainer";
import FilterArea from "@app/(main)/product/Components/FilterArea";
import Advertisement from "@app/(main)/product/Components/Advertisement";
import { readProducts } from "@/app/_actions/product";
import { ProductType } from "@utils/types/index";
import { ApiErrorHandlerServer } from "@utils/errorHandler/apiErrorHandler";

export default async function Product() {
  const unprocessedProductsResponse = await readProducts({
    limit: 40,
    offset: 0,
  });
  const productsResponse = ApiErrorHandlerServer<ProductType[]>({
    response: unprocessedProductsResponse,
  });

  return (
    <>
      <Advertisement />
      <div className="flex h-fit w-full flex-col gap-8 p-10 xl:p-4">
        <div className="flex w-full items-center justify-between px-16 xl:px-10 sm:px-0">
          <h1 className="text-2xl font-medium">Explore our products</h1>
          <SearchBar />
        </div>
        <CategoryCards />
        {productsResponse.data && (
          <ProductsContainer products={productsResponse.data} />
        )}
        <FilterArea />
      </div>
    </>
  );
}
