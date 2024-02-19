"use client";

import formatReadableTime from "@utils/functions/formatTime";
import formatCurrency from "@/utils/functions/formatCurrency";
import { Button } from "@components/ui/button";
import { useOrder } from "@/zustand/useOrder";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "./Columns";
import convertOrderToListOrder from "@utils/functions/convertOrderToListOrder";

export default function OrderSummary() {
  const { removeAll, order } = useOrder();

  return (
    <>
      {order ? (
        <>
          <div className="w-full h-fit flex flex-col gap-1">
            <div className="w-full flex flex-row sm:flex-col-reverse justify-between items-center sm:justify-start sm:items-start sm:gap-2">
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
              <span className="font-semibold">Total Price:</span>{" "}
              {formatCurrency(order.price)} VND
            </p>
          </div>
          <DataTable
            columns={columns}
            data={convertOrderToListOrder(order)}
            isPaginationEnabled={false}
            isCollumnVisibilityEnabled={false}
            isSearchEnabled={false}
          />
        </>
      ) : (
        <h2 className="font-light">Please, select order in Product</h2>
      )}
    </>
  );
}
