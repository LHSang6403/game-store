import SearchBar from "@components/Search/SearchBar";
import CategoryCards from "./Components/CategoryCards";
import ProductsContainer from "./Components/ProductsContainer";
import SheetArea from "./Components/FilterArea";
import Advertisement from "./Components/Advertisement";

export default function Product() {
  return (
    <>
      <Advertisement />
      <div className="flex h-fit w-full flex-col gap-8 p-10 xl:p-4">
        <div className="flex w-full items-center justify-between px-16 xl:px-10 sm:px-0">
          <h1 className="text-2xl font-medium">Explore our products</h1>
          <SearchBar />
        </div>
        <CategoryCards />
        <ProductsContainer />
        <SheetArea />
      </div>
    </>
  );
}
