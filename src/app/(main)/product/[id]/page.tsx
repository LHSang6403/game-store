import ProductDetail from "./Components/ProductDetail";
import ProductDescription from "./Components/ProductDescription";
import ProductReview from "./Components/ProductReview";

export default function Product({ params }: { params: { id: string } }) {
  console.log(params.id);

  return (
    <div className="w-full min-h-screen h-fit flex flex-col gap-10">
      <ProductDetail />
      <h2 className="text-2xl font-medium text-center">Product Description</h2>
      <ProductDescription />
      <h2 className="text-2xl font-medium text-center">Product Review</h2>
      <ProductReview />
    </div>
  );
}
