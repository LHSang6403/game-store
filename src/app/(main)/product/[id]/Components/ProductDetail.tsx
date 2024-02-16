import Decoration from "./Decoration";
import Title from "./Title";
import UserActions from "./UserActions";
import ProductImages from "./ProductImages";

export default function ProductDetail() {
  return (
    <div className="min-h-[90vh] h-fit pb-6 relative flex flex-row xl:flex-col">
      <div className="absolute w-[60%] h-[68%] ml-12 xl:ml-6 sm:ml-0 rounded-2xl transform -skew-x-[20deg] bg-gradient-to-r from-foreground/5 to-hsl(222.2, 84%, 4%)"></div>
      <div className="w-1/2 xl:w-full h-fit">
        <ProductImages />
      </div>
      <div className="w-1/2 xl:w-[80%] lg:w-[90%] sm:w-full pt-28 xl:pt-10 lg:pt-0 px-6 xl:mx-auto flex flex-col gap-3">
        <UserActions />
      </div>
      <Decoration />
      <Title />
    </div>
  );
}
