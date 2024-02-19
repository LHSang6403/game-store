"use client";

import ProductDetail from "./Components/ProductDetail";
import ProductDescription from "./Components/ProductDescription";
import ProductReview from "./Components/Review/ProductReview";
import useProductQuery from "@utils/hooks/useProductQuery";
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
          <div className="w-full min-h-screen h-fit flex flex-col gap-10 pb-10">
            <ProductDetail product={productResponse} />
            <h2 className="text-2xl font-medium text-center">
              Product Description
            </h2>
            <ProductDescription
              description={productResponse.product_description}
            />
            <h2 className="text-2xl font-medium text-center">Product Review</h2>
            <ProductReview
              comments={productResponse.product_description.comments}
            />
          </div>
        </Template>
      )}
    </>
  );
}
