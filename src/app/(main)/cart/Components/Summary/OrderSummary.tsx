"use client";

import formatReadableTime from "@utils/functions/formatTime";
import formatCurrency from "@/utils/functions/formatCurrency";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/zustand/useOrder";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "./Columns";
import Link from "next/link";

export default function OrderSummary() {
  const { order, removeAll } = useOrder();
  const products = order?.products;

  return (
    <>
      {products ? (
        <>
          <div className="flex h-fit w-[700px] flex-col gap-1 sm:w-full">
            <div className="flex w-full flex-row items-center justify-between sm:flex-col-reverse sm:items-start sm:justify-start sm:gap-2">
              <h2 className="text-lg font-semibold">Order summary</h2>
              <Button
                onClick={() => {
                  removeAll();
                }}
                variant="outline"
              >
                Remove all
              </Button>
            </div>
            <p>
              <span className="font-semibold">Customer:</span>{" "}
              {order.customer_name}
            </p>
            <p>
              <span className="font-semibold">Created at:</span>{" "}
              {formatReadableTime(order.created_at)}
            </p>
            <p>
              <span className="font-semibold">State:</span> {order.state}
            </p>
            <p>
              <span className="font-semibold">Price without fees:</span>{" "}
              {formatCurrency(order.price)} VND
            </p>
          </div>
          <DataTable
            key={JSON.stringify(products)}
            columns={columns}
            data={products}
            isPaginationEnabled={false}
            isCollumnVisibilityEnabled={false}
            isSearchEnabled={false}
          />
        </>
      ) : (
        <div className="text-center font-light">
          Please, select order in
          <Link
            className="hover:text-accent-foreground focus:text-accent-foreground h-9 w-fit rounded-md p-2 text-center text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            href="/product"
          >
            Product
          </Link>
        </div>
      )}
    </>
  );
}
