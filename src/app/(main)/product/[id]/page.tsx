"use client";

import ProductDetail from "@app/(main)/product/[id]/Components/ProductDetail";
import ProductDescription from "@app/(main)/product/[id]/Components/ProductDescription";
import useProductQuery from "@/hooks/useProductQuery";
import Template from "@app/(protected)/template";
import Loading from "@app/(main)/product/[id]/Components/ProductLoadingSkeleton";
import Image from "next/image";

export default function page({ params }: { params: { id: string } }) {
  const {
    data: product,
    error,
    isLoading,
    isSuccess,
  } = useProductQuery({ id: params.id });

  if (error) {
    throw new Error(error.message || "Không tìm thấy sản phẩm.");
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isSuccess && product && (
            <Template>
              <div className="flex h-fit min-h-screen w-full flex-col items-center gap-10 pb-10">
                <div className="relative w-full">
                  <div className="absolute left-0 right-0 top-0 z-0 w-full">
                    <Image
                      src="/assets/images/product/blue-bg.png"
                      alt="Background"
                      width={1440}
                      height={1440}
                      quality={100}
                      className="w-full rotate-[180deg] opacity-30"
                    />
                  </div>
                </div>
                <ProductDetail product={product} />
                <h2 className="bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-center text-3xl font-medium text-transparent">
                  Mô tả chi tiết
                </h2>
                {product.product_description.content && (
                  <ProductDescription
                    description={product.product_description}
                  />
                )}
              </div>
            </Template>
          )}
        </>
      )}
    </>
  );
}
