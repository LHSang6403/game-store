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
import { Label } from "@components/ui/label";
import { toast } from "sonner";
import { useOrder } from "@/zustand/useOrder";
import type { CustomerType } from "@utils/types";
import { createOrder } from "@app/_actions/order";
import { useMutation } from "@tanstack/react-query";
import formatCurrency from "@/utils/functions/formatCurrency";
import { processOrderRequestData } from "../../_actions";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";
import { useSession } from "@/zustand/useSession";

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
  const { setShipment } = useOrder();
  const session = useSession();

  const mutation = useMutation({
    mutationFn: async (orderData: OrderType) => {
      if (session.session) {
        const response = await createOrder({
          order: orderData,
          actor: {
            actorId: session.session.id,
            actorName: session.session.name,
          },
        });
        if (response.error) {
          toast.error(response.error);
        }
      }
    },
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

    toast.promise(
      // *** create ship order & save order ***

      async () => {
        let requestOrderResult: any;
        switch (formData.shipment) {
          case "GHN":
            const GHNResponse = await processOrderRequestData({
              formData: formData,
              order: order,
              customerSession: customerSession,
            });
            const ghn = ApiErrorHandlerClient<any>({
              response: GHNResponse,
            });

            console.log(ghn);
            setShipment("GHN", ghn.data.order_code);

            requestOrderResult = ghn.data;
            break;

          case "GHTK":
            const GHTKResponse = await processOrderRequestData({
              formData: formData,
              order: order,
              customerSession: customerSession,
            });
            const ghtk = ApiErrorHandlerClient<any>({
              response: GHTKResponse,
            });

            console.log(ghtk);
            setShipment("GHTK", ghtk.data.label);

            requestOrderResult = ghtk;
            break;
        }

        if (!order.shipment_label_code) {
          console.log(order);
          toast.error("Failed to create order, please try again.");
        } else {
          // *** Save to DB after payment and shipment ***
          mutation.mutateAsync(order);
        }
      },
      {
        loading: "Creating order...",
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
            <Label>Customer: </Label>
            <span className="font-light">{formData.name}</span>
          </div>
          <div>
            <Label>Phone: </Label>
            <span className="font-light">{formData.phone}</span>
          </div>
          <div>
            <Label htmlFor="name" className="text-right">
              Selected products:{" "}
            </Label>
            {order.products.map((prod, index) => (
              <>
                <span key={index} className="font-light">
                  {prod.product.name}
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
            <Label>Ship service: </Label>
            <span className="font-light">{formData.shipment}</span>
          </div>
          <div>
            <Label>Shipping fee: </Label>
            <span className="font-light">
              {formatCurrency(order.shipping_fee)} VND
            </span>
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
