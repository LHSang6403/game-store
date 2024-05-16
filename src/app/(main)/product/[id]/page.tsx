"use client";

import ProductDetail from "@app/(main)/product/[id]/Components/ProductDetail";
import ProductDescription from "@app/(main)/product/[id]/Components/ProductDescription";
import useProductQuery from "@/hooks/useProductQuery";
import Template from "@app/(protected)/template";
import Loading from "@app/(main)/product/[id]/Components/ProductLoadingSkeleton";

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
              <div className="flex h-fit min-h-screen w-full flex-col gap-10 pb-10">
                <ProductDetail product={product} />
                <h2 className="text-center text-2xl font-medium">
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
