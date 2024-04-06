"use client";

import { useOrder } from "@/zustand/useOrder";
import OrderSummary from "./OrderSummary";
import OrderForm from "./OrderForm";
import Link from "next/link";

export default function OrderCurrent() {
  const { order } = useOrder();

  return (
    <>
      {order?.products ? (
        <div className="mx-auto flex w-full flex-row justify-center gap-6 xl:flex-col xl:items-center sm:w-full">
          <div className="flex w-1/2 flex-col gap-3 xl:w-full">
            <OrderSummary />
          </div>
          <div className="w-1/2 xl:w-full">
            <OrderForm />
          </div>
        </div>
      ) : (
        <div className="w-full text-center font-light">
          Chọn sản phẩm tại
          <Link
            className="hover:text-accent-foreground focus:text-accent-foreground h-9 w-fit rounded-md p-2 text-center text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            href="/product"
          >
            Sản phẩm
          </Link>
        </div>
      )}
    </>
  );
}
