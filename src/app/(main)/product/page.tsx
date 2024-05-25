import SearchBar from "@components/Search/SearchBar";
import CategoryCards from "@app/(main)/product/Components/CategoryCards";
import ProductsContainer from "@app/(main)/product/Components/ProductsContainer";
import FilterArea from "@app/(main)/product/Components/FilterArea";
import { readProducts } from "@/app/_actions/product";
import { ProductType } from "@utils/types/index";
import Image from "next/image";

export default async function Product() {
  const products = await readProducts({
    limit: 60,
    offset: 0,
  });

  return (
    <>
      <div className="h-fit w-full py-10">
        <div className="relative w-full">
          <div className="absolute right-0 top-28 -z-20 w-fit">
            <Image
              src="/assets/images/product/circle-bg.png"
              alt="Circle"
              width={1000}
              height={1000}
              quality={100}
              className="w-[800px] opacity-30 lg:w-full"
            />
          </div>
          <div className="absolute left-0 top-0 -z-20 w-fit">
            <Image
              src="/assets/images/product/corner-bg.png"
              alt="Corner"
              width={1000}
              height={1000}
              quality={100}
              className="w-[800px] opacity-30 lg:w-full"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-4xl font-bold xl:text-3xl">
            <span className="bg-gradient-to-r from-[#51c5fe] to-[#6f18f3] bg-clip-text text-transparent">
              Khuyến mãi
            </span>{" "}
            <br className="xl:hidden"></br> tốt nhất
          </h1>
          <p className="max-w-[700px] text-center font-light lg:max-w-full sm:text-sm">
            2Win luôn có những chương trình khuyến mãi hấp dẫn để mang đến cho
            khách hàng trải nghiệm mua sắm tuyệt vời nhất. Vui lòng chọn sản
            phẩm hoặc liên hệ ngay với chúng tôi để có giá tốt nhất.
          </p>
        </div>
      </div>
      <div className="relative flex h-fit w-full flex-col gap-8 p-10 xl:p-4">
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
        <div className="flex w-full items-center justify-between px-16 xl:px-10 sm:flex-col sm:gap-4 sm:px-0">
          <h1 className="z-20 bg-gradient-to-r from-[#6f18f3] to-[#51c5fe] bg-clip-text text-2xl font-medium text-transparent">
            Các sản phẩm
          </h1>
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
