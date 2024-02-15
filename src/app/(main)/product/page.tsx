import SearchBar from "@components/Search/SearchBar";
import CategoryCards from "./Components/CategoryCards";
import ProductsContainer from "./Components/ProductsContainer";
import SheetArea from "./Components/FilterArea";
import Advertisement from "./Components/Advertisement";

export default function Products() {
  return (
    <>
      <Advertisement />
      <div className="w-full h-fit p-10 xl:p-4 flex flex-col gap-8">
        <div className="w-full flex justify-between px-16 xl:px-10 sm:px-6">
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
