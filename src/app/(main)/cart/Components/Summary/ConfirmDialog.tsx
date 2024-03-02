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
import { requestOrder } from "@/app/_actions/GHTKShipment";
import { toast } from "sonner";
import { useOrder } from "@/zustand/useOrder";
import { useSession } from "@/zustand/useSession";
import type { CustomerType } from "@utils/types";
import { createOrder } from "@app/_actions/order";
import { useMutation } from "@tanstack/react-query";
import formatCurrency from "@/utils/functions/formatCurrency";

export interface ProductRequest {
  name: string;
  quantity: number;
  weight: number;
}

export interface OrderRequest {
  id: string;
  pick_name: string;
  pick_province: string;
  pick_district: string;
  pick_ward: string;
  pick_address: string;
  pick_tel: string;
  tel: string;
  name: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  hamlet: string;
  is_freeship: string;
  pick_money: number;
  note: string;
  value: number;
  pick_option: string;
  email: string;
  return_email: string;
}

export default function ConfirmDialog({
  orderRequest,
  productsRequest,
  isOpen,
  onOpenChange,
}: {
  orderRequest: OrderRequest;
  productsRequest: ProductRequest[];
  isOpen: boolean;
  onOpenChange: Function;
}) {
  const { order, setShipment } = useOrder();
  const { session } = useSession();
  const customerSession = session as CustomerType;

  if (!order) return <></>;

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
        const requestOrderResult = await requestOrder({
          products: productsRequest,
          order: orderRequest,
        });

        console.log("---- request order result", requestOrderResult);

        // store label of response to zustand
        if (requestOrderResult.order) {
          setShipment("GHTK", requestOrderResult.order.label);
        }

        if (!requestOrderResult.success) {
          toast.error(requestOrderResult.message);
        } else {
          // *** Save to database after payment and shipment ***
          const orderData: OrderType = createOrderData(
            order!,
            orderRequest,
            requestOrderResult,
            customerSession
          );
          mutation.mutateAsync(orderData);
          console.log("Save Order data to DB:", orderData);
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
        <div className="mt-2 flex flex-col gap-2 text-sm">
          <div className="">
            <Label htmlFor="name" className="text-right">
              Selected products:{" "}
            </Label>
            {productsRequest.map((prod, index) => (
              <>
                <span key={index} className="font-light">
                  {prod.name}
                </span>
                {index !== productsRequest.length - 1 && <span>, </span>}
              </>
            ))}
          </div>
          <div className="">
            <Label htmlFor="name" className="text-right">
              Ship to:{" "}
            </Label>
            <span className="font-light">
              {orderRequest.address}, {orderRequest.ward},{" "}
              {orderRequest.district}, {orderRequest.province}
            </span>
          </div>
          <div className="">
            <Label htmlFor="name" className="text-right">
              Products price:{" "}
            </Label>
            <span className="font-light">
              {formatCurrency(order.price)} VND
            </span>
          </div>
          <div className="">
            <Label htmlFor="name" className="text-right">
              Shipping fee:{" "}
            </Label>
            <span className="font-light">
              {formatCurrency(order.shipping_fee)} VND
            </span>
          </div>
          <div className="">
            <Label htmlFor="name" className="text-right">
              Insurance fee:{" "}
            </Label>
            <span className="font-light">
              {formatCurrency(order.insurance_fee)} VND
            </span>
          </div>
          <div className="">
            <Label htmlFor="name" className="text-right">
              Total price:{" "}
            </Label>
            <span className="font-light">
              {formatCurrency(order.total_price)} VND
            </span>
          </div>
        </div>
        <Button
          type="submit"
          onClick={handleBuy}
          className="mt-3 w-full bg-foreground text-background"
        >
          Buy
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function createOrderData(
  order: OrderType,
  orderRequest: OrderRequest,
  requestOrderResult: any,
  customerSession: CustomerType
): OrderType {
  return {
    id: order?.id || "",
    created_at: new Date().toISOString(),
    shipment_name: "GHTK",
    shipment_label: requestOrderResult?.order?.label || "",
    products: order?.products || [],
    state: order?.state || "pending",
    customer_id: customerSession?.id || "",
    customer_name: orderRequest?.name || customerSession?.name || "Unknown",
    price: order?.price || 0,
    shipping_fee: 0,
    insurance_fee: 0,
    total_price: 0,
    note: orderRequest?.note || "",
    address: orderRequest?.address || customerSession?.ward || "Unknown",
    ward: orderRequest?.ward || customerSession?.ward || "Unknown",
    district: orderRequest?.district || customerSession?.district || "Unknown",
    province: orderRequest?.province || customerSession?.province || "Unknown",
    pick_address: order?.pick_address ?? "",
    pick_ward: order?.pick_ward ?? "",
    pick_district: order?.pick_district ?? "",
    pick_province: order?.pick_province ?? "",
    weight: order?.weight ?? 0,
  };
}
