"use client";

import { OrderType } from "@utils/types";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@components/ui/label";
import { requestGHTKOrder } from "@/app/_actions/GHTKShipment";
import { requestGHNOrder } from "@/app/_actions/GHNShipment";
import { toast } from "sonner";
import { useOrder } from "@/zustand/useOrder";
import { useSession } from "@/zustand/useSession";
import type { CustomerType } from "@utils/types";
import { createOrder } from "@app/_actions/order";
import { useMutation } from "@tanstack/react-query";
import formatCurrency from "@/utils/functions/formatCurrency";
import {
  GHNDataType,
  GHTKDataType,
  processOrderRequestData,
} from "../../_actions";

export default function ConfirmDialog({
  formData,
  order,
  customerSession,
  isOpen,
  onOpenChange,
}: {
  formData: any;
  order: OrderType;
  customerSession: CustomerType;
  isOpen: boolean;
  onOpenChange: Function;
}) {
  const { setShipment, setCustomer } = useOrder();

  const mutation = useMutation({
    mutationFn: async (orderData: OrderType) => await createOrder(orderData),
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  async function handleBuy() {
    // *** 9pay payment gateway ***
    // const result = await generatePaymentUrl(
    //   100000,
    //   "Sang's Order payment test 1.",
    //   `${window.location.href}/payment/success`
    // );
    // console.log("----result", result);

    // *** GHTK create order & save order ***

    toast.promise(
      async () => {
        let requestOrderResult: any;
        switch (formData.shipment) {
          case "GHN":
            const ghnDataResponse = await processOrderRequestData({
              formData: formData,
              order: order,
              customerSession: customerSession,
            });

            setShipment("GHN", ghnDataResponse.data.order_code);
            requestOrderResult = ghnDataResponse;
            break;

          case "GHTK":
            const ghtkResponse = await processOrderRequestData({
              formData: formData,
              order: order,
              customerSession: customerSession,
            });

            console.log("----ghtkResponse label", ghtkResponse.order.label);

            setShipment("GHTK", ghtkResponse.order.label);
            requestOrderResult = ghtkResponse;
            break;
        }

        if (!requestOrderResult.success && requestOrderResult.code !== 200) {
          toast.error(requestOrderResult.message);
        } else {
          // *** Save to database after payment and shipment ***

          setCustomer(customerSession.id, customerSession.name);
          mutation.mutateAsync(order);
          console.log("----order to db", order);
        }
      },
      {
        loading: "Creating order...",
        success: "Order is created successfully!",
        error: (error) => {
          return `Failed to create order ${error}`;
        },
      }
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenChange()}>
      <DialogContent className="rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order confirmation</DialogTitle>
          <DialogDescription>
            Check your order and fees carefully and click buy when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-1 text-sm">
          <div>
            <Label htmlFor="name" className="text-right">
              Selected products:{" "}
            </Label>
            {order.products.map((prod, index) => (
              <>
                <span key={index} className="font-light">
                  {prod.name}
                </span>
                {index !== order.products.length - 1 && <span>, </span>}
              </>
            ))}
          </div>
          <div>
            <Label>Ship to: </Label>
            <span className="font-light">
              {order.pick_address}, {order.pick_ward}, {order.pick_district},{" "}
              {order.pick_province}
            </span>
          </div>
          <div>
            <Label>Products price: </Label>
            <span className="font-light">
              {formatCurrency(order.price)} VND
            </span>
          </div>
          <div>
            <Label>Shipping fee: </Label>
            <span className="font-light">
              {formatCurrency(order.shipping_fee)} VND
            </span>
          </div>
          <div className="mt-1 rounded-md border px-3 py-2">
            <div className="flex flex-row items-center ">
              <Checkbox
                disabled={order.insurance_fee === 0}
                className="mr-2 data-[state=checked]:text-background"
                id="insurance"
              />
              <div>
                <Label>Insurance fee: </Label>
                <span className="font-light">
                  {formatCurrency(order.insurance_fee)} VND
                </span>
              </div>
            </div>
            <p className="mt-1 font-light">
              By select this option, your products will be protected and
              indemnified.
            </p>
          </div>
          <div className="mt-2 font-semibold">
            <Label className="font-semibold">Total price: </Label>
            <span className="">{formatCurrency(order.total_price)} VND</span>
          </div>
        </div>
        <Button
          type="submit"
          onClick={handleBuy}
          className="w-full bg-foreground text-background"
        >
          Buy
        </Button>
      </DialogContent>
    </Dialog>
  );
}
