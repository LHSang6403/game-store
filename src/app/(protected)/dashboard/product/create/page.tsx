import ProductForm from "../_components/ProductForm";

export default function page() {
  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-2 pb-6">
      <h1 className="my-2 text-2xl font-medium">Tạo sản phẩm</h1>
      <div className="h-fit w-full">
        <ProductForm />
      </div>
    </div>
  );
}
