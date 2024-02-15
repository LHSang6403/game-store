import SearchBar from "@components/Search/SearchBar";
import CategoryCards from "./Components/CategoryCards";
import ProductsContainer from "./Components/ProductsContainer";
import SheetArea from "./Components/FilterArea";

export default function Products() {
  return (
    <div className="w-full h-fit p-10 pt-2 xl:p-4 flex flex-col gap-8">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-medium">Explore our products</h1>
        <SearchBar />
      </div>
      <CategoryCards />
      <ProductsContainer />
      <SheetArea />
    </div>
  );
}
