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
import { createOrder } from "@app/_actions/order";
import { useMutation } from "@tanstack/react-query";
import formatCurrency from "@/utils/functions/formatCurrency";
import { processOrderGHN } from "@/app/(main)/cart/_actions/processGHN";
import { processOrderGHTK } from "@/app/(main)/cart/_actions/processGHTK";
import { useSession, SessionState } from "@/zustand/useSession";
import { useOrder, OrderState } from "@/zustand/useOrder";

export default function ConfirmDialog({
  formData,
  order,
  isOpen,
  onOpenChange,
}: {
  formData: any;
  order: OrderType;
  isOpen: boolean;
  onOpenChange: Function;
}) {
  const session = useSession() as SessionState;
  const { removeAll } = useOrder() as OrderState;

  const mutation = useMutation({
    mutationFn: async (orderData: OrderType) => {
      if (session.session) {
        await createOrder({
          order: orderData,
          actor: {
            actorId: session.session.id,

            actorName: session.session.name,
          },
        });
      }
    },
  });

  async function handleBuy() {
    // *** 9pay payment gateway ***

    // const result = await generatePaymentUrl(
    //   100000,
    //   "Sang's Order payment test 1.",
    //   `${window.location.href}/payment/success`
    // );

    // create ship order & save order to DB
    toast.promise(
      async () => {
        switch (formData.shipment) {
          case "GHN":
            try {
              const GHNResponse = await processOrderGHN({
                formData: formData,
                order: order,
              });

              order.shipment_name = "GHN";
              order.shipment_label_code = GHNResponse.data.order_code;
            } catch (error: any) {
              throw new Error(
                "Tạo đơn GHN thất bại, dịch vụ không hỗ trợ địa chỉ này. Vui lòng thử lại sau."
              );
            }

            break;

          case "GHTK":
            try {
              const GHTKResponse = await processOrderGHTK({
                formData: formData,
                order: order,
              });

              order.shipment_name = "GHTK";
              order.shipment_label_code = GHTKResponse.data.label;
            } catch (error: any) {
              throw new Error(
                "Tạo đơn GHTK thất bại, dịch vụ không hỗ trợ địa chỉ này. Vui lòng thử lại sau."
              );
            }

            break;
        }

        if (!order.shipment_label_code) {
          throw new Error(
            "Dịch vụ tạm thời không hỗ trợ địa chỉ này. Vui lòng thử lại sau."
          );
        }

        // save to DB after payment and shipment
        mutation.mutate(order);
      },
      {
        success: () => {
          onOpenChange(false);
          removeAll();

          return "Đặt hàng thành công. Shipper sẽ sớm liên hệ bạn.";
        },
        loading: "Đang tạo đơn hàng...",
        error: (error: any) => {
          return "Đã có lỗi xảy ra: " + error.message;
        },
      }
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenChange()}>
      <DialogContent className="rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận đơn hàng</DialogTitle>
          <DialogDescription>
            Vui lòng kiểm tra lại toàn bộ thông tin đơn hàng trước khi xác nhận.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-1 text-sm">
          <div>
            <Label>Khách hàng: </Label>
            <span className="font-light">{order.customer_name}</span>
          </div>
          <div>
            <Label>Điện thoại: </Label>
            <span className="font-light">{order.customer_phone}</span>
          </div>
          <div>
            <Label htmlFor="name" className="text-right">
              Sản phẩm:{" "}
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
            <Label>Giao đến: </Label>
            <span className="font-light">
              {order.address}, {order.ward}, {order.district}, {order.province}
            </span>
          </div>
          <div>
            <Label>Giá sản phẩm: </Label>
            <span className="font-light">
              {formatCurrency(order.price ?? "0")} VNĐ
            </span>
          </div>
          <div>
            <Label>Giao hàng: </Label>
            <span className="font-light">{formData.shipment}</span>
          </div>
          <div>
            <Label>Phí giao hàng: </Label>
            <span className="font-light">
              {formatCurrency(order.shipping_fee ?? "0")} VNĐ
            </span>
          </div>
          <div className="mt-4 font-semibold">
            <Label className="font-semibold">Tổng tiền: </Label>
            <span className="">
              {formatCurrency(order.total_price ?? "0")} VNĐ
            </span>
          </div>
        </div>
        <Button
          type="submit"
          onClick={handleBuy}
          className="w-full bg-gradient-to-r from-[#9733ED] via-[#F22B9C] to-[#FD7A36] text-background"
        >
          Đặt mua
        </Button>
      </DialogContent>
    </Dialog>
  );
}
