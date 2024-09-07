import SearchBar from "@components/Search/SearchBar";
import CategoryCards from "@app/(main)/product/Components/CategoryCards";
import ProductsContainer from "@app/(main)/product/Components/ProductsContainer";
import FilterArea from "@app/(main)/product/Components/FilterArea";
import { readProducts } from "@/app/_actions/product";
import { ProductType } from "@utils/types/index";
import Image from "next/image";
import FilterAreaV2 from "./Components/FilterArea-v2";

export default async function Product() {
  const products = await readProducts({
    limit: 60,
    offset: 0,
  });

  // Filter the top 4 products with the highest sold_quantity
  const bestSellingProducts = products.data
    ?.slice()
    .sort((a: ProductType, b: ProductType) => b.sold_quantity - a.sold_quantity)
    .slice(0, 4);

  return (
    <>
      <div className="h-fit w-full pt-10">
        <div className="relative w-full">
          {/* <div className="absolute -top-4 left-0 right-0 -z-20 flex w-full justify-center">
            <Image
              src="/assets/images/product/circle-bg.png"
              alt="Circle"
              width={1300}
              height={1000}
              quality={100}
              className="opacity-30"
            />
          </div> */}
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-4xl font-bold xl:text-3xl">
            <span className="bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-transparent">
              Khuyến mãi
            </span>{" "}
            <br className="xl:hidden"></br> tốt nhất
          </h1>
          <p className="max-w-[700px] text-center font-light lg:mx-4 lg:max-w-full sm:text-sm">
            2Win luôn có những chương trình khuyến mãi hấp dẫn để mang đến cho
            khách hàng trải nghiệm mua sắm tuyệt vời nhất. Vui lòng chọn sản
            phẩm hoặc liên hệ ngay với chúng tôi để có giá tốt nhất.
          </p>
        </div>
      </div>
      <div className="relative mx-auto flex h-fit w-fit flex-col gap-8 p-10 xl:p-4">
        <div className="absolute bottom-0 left-0 right-0 -z-20">
          <Image
            src="/assets/images/product/blue-bg.png"
            alt="Background"
            width={1440}
            height={1440}
            quality={100}
            className="w-full opacity-30"
          />
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-6">
          <h1 className="z-20 bg-gradient-to-r from-cpurple to-cblue bg-clip-text text-2xl font-medium text-transparent">
            Các sản phẩm
          </h1>
          <div className="w-[500px] rounded-[9px] bg-gradient-to-r from-cpurple via-cpink to-corange p-[1.5px] sm:w-full sm:rounded-[7px]">
            <SearchBar />
          </div>
        </div>
        <CategoryCards />
        <FilterAreaV2 />
        {bestSellingProducts && (
          <ProductsContainer
            products={bestSellingProducts as ProductType[]}
            isBestSeller={true}
          />
        )}
        <h2 className="text-left text-xl font-medium">Tất cả sản phẩm</h2>
        {products.data && (
          <ProductsContainer products={products.data as ProductType[]} />
        )}
      </div>
    </>
  );
}
