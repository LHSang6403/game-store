import SearchBar from "@components/Search/SearchBar";
import CategoryCards from "@app/(main)/product/Components/CategoryCards";
import ProductsContainer from "@app/(main)/product/Components/ProductsContainer";
import FilterArea from "@app/(main)/product/Components/FilterArea";
import Advertisement from "@app/(main)/product/Components/Advertisement";
import { readProducts } from "@/app/_actions/product";
import { ProductType } from "@utils/types/index";

export default async function Product() {
  const products = await readProducts({
    limit: 60,
    offset: 0,
  });

  return (
    <>
      <Advertisement />
      <div className="flex h-fit w-full flex-col gap-8 p-10 xl:p-4">
        <div className="flex w-full items-center justify-between px-16 xl:px-10 sm:flex-col sm:gap-4 sm:px-0">
          <h1 className="text-2xl font-medium">Explore our products</h1>
          <div className="w-64 sm:w-full">
            <SearchBar />
          </div>
        </div>
        <CategoryCards />
        {products.data && (
          <ProductsContainer products={products.data as ProductType[]} />
        )}
        <FilterArea />
      </div>
    </>
  );
}
