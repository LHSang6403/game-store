"use client";

import { OrderType } from "@utils/types";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { Label } from "@components/ui/label";

export default function ConfirmDialog({ order }: { order: OrderType }) {
  // cal api fees
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-8 w-full bg-foreground text-background">
          Calculate prices
        </Button>
      </DialogTrigger>
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
            {order.products.map((prod, index) => (
              <>
                <span key={index} className="font-light">
                  {prod.name}
                </span>
                {index !== order.products.length - 1 && <span>, </span>}
              </>
            ))}
          </div>
          <div className="">
            <Label htmlFor="name" className="text-right">
              Ship to:{" "}
            </Label>
            <span className="font-light">
              {order.address}, {order.ward}, {order.district}, {order.province}
            </span>
          </div>
          <div className="">
            <Label htmlFor="name" className="text-right">
              Products price:{" "}
            </Label>
            <span className="font-light">{order.price}</span>
          </div>
          <div className="">
            <Label htmlFor="name" className="text-right">
              Shipping fee:{" "}
            </Label>
            <span className="font-light">{order.shipping_fee}</span>
          </div>
          <div className="">
            <Label htmlFor="name" className="text-right">
              Insurance fee:{" "}
            </Label>
            <span className="font-light">{order.insurance_fee}</span>
          </div>
          <div className="">
            <Label htmlFor="name" className="text-right">
              Total price:{" "}
            </Label>
            <span className="font-light">{order.total_price}</span>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-3 w-full bg-foreground text-background"
        >
          Buy
        </Button>
      </DialogContent>
    </Dialog>
  );
}
