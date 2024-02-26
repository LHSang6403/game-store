import SearchBar from "@components/Search/SearchBar";
import CategoryCards from "./Components/CategoryCards";
import ProductsContainer from "./Components/ProductsContainer";
import SheetArea from "./Components/FilterArea";
import Advertisement from "./Components/Advertisement";
import { readProducts } from "@/app/_actions/product";

export default async function Product() {
  const productsResponse = await readProducts({ limit: 10, offset: 0 });
  if (productsResponse.error) throw new Error(productsResponse.error.message);

  if (productsResponse.error) {
    return <div className="mx-auto w-fit">Product not found</div>;
  }

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
          <ProductsContainer productsResponse={productsResponse} />
        )}
        <SheetArea />
      </div>
    </>
  );
}
