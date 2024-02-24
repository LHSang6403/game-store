import OrderSummary from "./Components/Summary/OrderSummary";
import OrderHistory from "./Components/History/OrderHistory";
import OrderForm from "./Components/Summary/OrderForm";

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col gap-4 px-12 pb-10 xl:px-6 sm:px-4">
      <div className="to-hsl(222.2, 84%, 4%) absolute -z-10 -ml-10 sm:-ml-20 h-full w-1/2 -skew-x-[20deg] bg-gradient-to-r from-foreground/10"></div>
      <div className="to-hsl(222.2, 84%, 4%) absolute -z-10 ml-16 sm:ml-10 h-full w-1/2 -skew-x-[20deg] bg-gradient-to-r from-accent"></div>
      <h1 className="mt-4 text-center text-3xl font-semibold">
        Your selected products
      </h1>
      <div className="mx-auto flex w-fit flex-row justify-center gap-6 xl:flex-col xl:items-center sm:w-full">
        <div className="flex w-fit  flex-col gap-3 sm:w-full">
          <OrderSummary />
        </div>
        <div className="w-fit sm:w-full">
          <OrderForm />
        </div>
      </div>
      <hr className="mx-auto my-4 w-[70%] rounded-full xl:w-[90%]"></hr>
      <div className="">
        <OrderHistory />
      </div>
    </div>
  );
}
