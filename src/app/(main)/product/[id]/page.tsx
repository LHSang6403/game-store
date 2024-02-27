"use client";

import ProductDetail from "@app/(main)/product/[id]/Components/ProductDetail";
import ProductDescription from "@app/(main)/product/[id]/Components/ProductDescription";
import ProductReview from "@app/(main)/product/[id]/Components/Review/ProductReview";
import useProductQuery from "@/hooks/useProductQuery";
import Template from "@app/(protected)/template";

export default async function Product({ params }: { params: { id: string } }) {
  const { data: productResponse, error, isSuccess } = useProductQuery(params);

  if (error) {
    throw new Error(error.message || "Failed to fetch product.");
  }

  return (
    <>
      {isSuccess && (
        <Template>
          <div className="flex h-fit min-h-screen w-full flex-col gap-10 pb-10">
            <ProductDetail product={productResponse} />
            <h2 className="text-center text-2xl font-medium">
              Product Description
            </h2>
            <ProductDescription
              description={productResponse.product_description}
            />
            <h2 className="text-center text-2xl font-medium">Product Review</h2>
            <ProductReview
              comments={productResponse.product_description.comments}
            />
          </div>
        </Template>
      )}
    </>
  );
}
