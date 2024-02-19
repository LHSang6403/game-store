import OrderSummary from "./Components/Summary/OrderSummary";
import OrderHistory from "./Components/History/OrderHistory";
import OrderForm from "./Components/Summary/OrderForm";

export default function Page() {
  return (
    <div className="min-h-screen w-full px-12 pb-10 flex flex-col gap-4">
      <h1 className="mt-4 text-center text-3xl font-semibold">
        Your selected products
      </h1>
      <div className="w-fit mx-auto flex flex-row gap-6">
        <div className="w-fit flex flex-col gap-3">
          <OrderSummary />
        </div>
        <div className="w-fit">
          <OrderForm />
        </div>
      </div>
      <hr className="w-[70%] mx-auto my-4 rounded-full"></hr>
      <div className="">
        <OrderHistory />
      </div>
    </div>
  );
}
