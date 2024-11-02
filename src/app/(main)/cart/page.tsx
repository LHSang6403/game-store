import ClientBack from "@/components/ClientBack";
import OrderHistory from "@/app/(main)/cart/_components/History/OrderHistory";
import OrderCurrent from "@/app/(main)/cart/_components/Summary/OrderCurrent";

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-4 xl:px-10 pb-10 md:px-6 px-4">
      <div className="md:left-6 top-2 z-40 h-fit w-full left-4">
        <ClientBack />
      </div>
      <h1 className="-mt-4">
        <span className="bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-center text-3xl font-semibold text-transparent">
          Sản phẩm đã chọn
        </span>
      </h1>
      <OrderCurrent />
      <hr className="mx-auto my-4 xl:w-[70%] rounded-full md:w-[90%] w-full"></hr>
      <div className="w-full">
        <OrderHistory />
      </div>
    </div>
  );
}
