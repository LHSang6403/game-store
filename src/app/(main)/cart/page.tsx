import OrderHistory from "@app/(main)/cart/Components/History/OrderHistory";
import OrderCurrent from "@app/(main)/cart/Components/Summary/OrderCurrent";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 px-10 pb-10 xl:px-6 sm:px-4">
      <h1 className="mt-6">
        <span className="bg-gradient-to-r from-[#02A9FF] to-[#8538F8] bg-clip-text text-center text-3xl font-semibold text-transparent">
          Sản phẩm đã chọn
        </span>
      </h1>
      <OrderCurrent />
      <hr className="mx-auto my-4 w-[70%] rounded-full xl:w-[90%]"></hr>
      <div className="xl:w-full">
        <OrderHistory />
      </div>
    </div>
  );
}
