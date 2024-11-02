"use client";

import { useOrder, OrderState } from "@/zustand/useOrder";
import OrderSummary from "./OrderSummary";
import OrderForm from "@/app/(main)/cart/_components/Summary/OrderForm";
import Link from "next/link";

export default function OrderCurrent() {
  const { order } = useOrder() as OrderState;

  return (
    <>
      {order?.products ? (
        <div className="mx-auto flex md:w-full md:flex-row justify-center gap-4 flex-col items-center w-full">
          <div className="flex w-1/2 flex-col xl:w-full">
            <OrderSummary />
          </div>
          <div className="md:w-1/2 w-full">
            <OrderForm />
          </div>
        </div>
      ) : (
        <div className="w-full text-center font-light">
          Chọn sản phẩm tại
          <Link className="h-9 w-fit px-1 font-light underline" href="/product">
            sản phẩm
          </Link>
        </div>
      )}
    </>
  );
}
