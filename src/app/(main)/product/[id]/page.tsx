"use client";

import ProductDetail from "@app/(main)/product/[id]/Components/ProductDetail";
import ProductDescription from "@app/(main)/product/[id]/Components/ProductDescription";
import useProductQuery from "@/hooks/useProductQuery";
import Template from "@app/(protected)/template";

export default async function Product({ params }: { params: { id: string } }) {
  const {
    data: product,
    error,
    isSuccess,
  } = useProductQuery({ id: params.id });

  if (error) {
    throw new Error(error.message || "Failed to fetch product.");
  }

  return (
    <>
      {isSuccess && product && (
        <Template>
          <div className="flex h-fit min-h-screen w-full flex-col gap-10 pb-10">
            <ProductDetail product={product} />
            <h2 className="text-center text-2xl font-medium">
              Product Description
            </h2>
            <ProductDescription description={product.product_description} />
          </div>
        </Template>
      )}
    </>
  );
}
