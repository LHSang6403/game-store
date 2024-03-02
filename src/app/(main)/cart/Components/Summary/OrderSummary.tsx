"use client";

import formatReadableTime from "@utils/functions/formatTime";
import formatCurrency from "@/utils/functions/formatCurrency";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/zustand/useOrder";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "./Columns";
import Link from "next/link";

export default function OrderSummary() {
  const { removeAll, order } = useOrder();

  return (
    <>
      {order ? (
        <>
          <div className="flex h-fit w-[700px] flex-col gap-1 sm:w-full">
            <div className="flex w-full flex-row items-center justify-between sm:flex-col-reverse sm:items-start sm:justify-start sm:gap-2">
              <h2 className="text-lg font-semibold">Your order summary</h2>
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
            columns={columns}
            data={order.products}
            isPaginationEnabled={false}
            isCollumnVisibilityEnabled={false}
            isSearchEnabled={false}
          />
        </>
      ) : (
        <div className="text-center font-light">
          Please, select order in{" "}
          <Link className="hover:font-normal" href="/product">
            Product
          </Link>
        </div>
      )}
    </>
  );
}
