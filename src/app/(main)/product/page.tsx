import SearchBar from "@components/Search/SearchBar";
import CategoryCards from "@app/(main)/product/Components/CategoryCards";
import ProductsContainer from "@app/(main)/product/Components/ProductsContainer";
import SheetArea from "@app/(main)/product/Components/FilterArea";
import Advertisement from "@app/(main)/product/Components/Advertisement";
import { readProducts } from "@/app/_actions/product";

export default async function Product() {
  const productsResponse = await readProducts({ limit: 10, offset: 0 });
  if (!productsResponse || productsResponse.error)
    throw new Error(productsResponse.error.message || "An error occurred.");

  return (
    <>
      <Advertisement />
      <div className="flex h-fit w-full flex-col gap-8 p-10 xl:p-4">
        <div className="flex w-full items-center justify-between px-16 xl:px-10 sm:px-0">
          <h1 className="text-2xl font-medium">Explore our products</h1>
          <SearchBar />
        </div>
        <CategoryCards />
        {productsResponse && productsResponse.data && (
          <ProductsContainer productsResponse={productsResponse} />
        )}
        <SheetArea />
      </div>
    </>
  );
}
