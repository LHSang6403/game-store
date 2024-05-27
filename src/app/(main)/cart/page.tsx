import ClientBack from "@/components/ClientBack";
import OrderHistory from "@app/(main)/cart/Components/History/OrderHistory";
import OrderCurrent from "@app/(main)/cart/Components/Summary/OrderCurrent";

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-4 px-10 pb-10 xl:px-6 sm:px-4">
      <div className="left-6 top-2 z-40 h-fit w-full sm:left-4">
        <ClientBack />
      </div>
      <h1 className="-mt-4">
        <span className="bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-center text-3xl font-semibold text-transparent">
          Sản phẩm đã chọn
        </span>
      </h1>
      <OrderCurrent />
      <hr className="mx-auto my-4 w-[70%] rounded-full xl:w-[90%] sm:w-full"></hr>
      <div className="w-full">
        <OrderHistory />
      </div>
    </div>
  );
}
