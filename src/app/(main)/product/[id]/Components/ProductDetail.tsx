import Decoration from "./Decoration";
import Title from "./Title";
import UserActions from "./UserActions";
import ProductImages from "./ProductImages";

export default function ProductDetail() {
  return (
    <div className="min-h-[90vh] h-fit pb-6 relative flex flex-row xl:flex-col">
      <div className="w-1/2 xl:w-full h-fit">
        <ProductImages />
      </div>
      <div className="w-1/2 xl:w-[80%] lg:w-[90%] sm:w-full pt-28 xl:pt-10 lg:pt-0 px-6 xl:mx-auto flex flex-col gap-4">
        <UserActions />
      </div>
      <Decoration />
      <Title />
    </div>
  );
}
