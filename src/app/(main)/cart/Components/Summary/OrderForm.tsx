"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Textarea } from "@components/ui/textarea";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useSession } from "@/zustand/useSession";
import { useOrder } from "@/zustand/useOrder";
import type { CustomerType, OrderType } from "@utils/types";
import { generate } from "randomstring";
import ConfirmDialog from "./ConfirmDialog";
import { getShipmentFees } from "@app/_actions/GHTKShipment";
import { useState, useEffect } from "react";
import type { ProductRequest, OrderRequest, OrderFeesParams } from "./types";
import FormAddressSelects from "./FormAddressSelects";
import useAddressSelects from "@/zustand/useAddressSelects";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is a compulsory." }),
  phone: z
    .string()
    .min(6, { message: "Must be a valid mobile number" })
    .max(12, { message: "Must be a valid mobile number" }),
  address: z
    .string()
    .min(2, { message: "Your address is a compulsory for shipping." }),
  ward: z
    .string()
    .min(2, { message: "Your address is a compulsory for shipping." }),
  district: z
    .string()
    .min(2, { message: "Your address is a compulsory for shipping." }),
  province: z
    .string()
    .min(5, { message: "Your address is a compulsory for shipping." }),
  note: z.string(),
});

export default function OrderForm() {
  const { order, setPrices } = useOrder();
  const { session } = useSession();
  const { addressValues } = useAddressSelects();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // fill customer info automatically if logged in
  const customerSession = session as CustomerType;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: customerSession?.name || "",
      phone: customerSession?.phone || "",
      address: customerSession?.address || "",
      ward: addressValues?.commune || customerSession?.ward || "",
      district: addressValues?.district || customerSession?.district || "",
      province: addressValues?.province || customerSession?.province || "",
      note: "",
    },
  });

  // set to from's address if select selects
  const { setValue } = form;
  useEffect(() => {
    if (customerSession) {
      setValue("province", addressValues.province);
      setValue("district", addressValues.district);
      setValue("ward", addressValues.commune);
    }
  }, [addressValues]);

  const [productsRequest, setProductsRequest] = useState<ProductRequest[]>([]);
  const [orderRequest, setOrderRequest] = useState<OrderRequest>();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!order) {
      return <></>;
    }

    const { productsRequest, orderRequest, shipFeesRequest } = createRequests({
      order: order,
      data: data,
      customerSession: customerSession,
    }) as {
      productsRequest: ProductRequest[];
      orderRequest: OrderRequest;
      shipFeesRequest: OrderFeesParams;
    };

    setProductsRequest(productsRequest);
    setOrderRequest(orderRequest);

    toast.promise(
      async () => {
        const calFeesResult = await getShipmentFees({
          params: shipFeesRequest,
        });

        if (calFeesResult.success && orderRequest && productsRequest) {
          setPrices(
            calFeesResult.fee.ship_fee_only,
            calFeesResult.fee.insurance_fee
          );
          setIsDialogOpen(true);
        }
      },
      {
        loading: "Calculating order...",
        error: (error) => {
          return `Failed to calculate order ${error}`;
        },
      }
    );
  }

  return (
    <>
      {order && (
        <div className="flex h-fit w-[600px] flex-col gap-2 rounded-md border px-3 py-2 pb-4 sm:w-full">
          <h2 className="text-lg font-semibold">Your order summary</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-2 gap-3 sm:grid-cols-1"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                        type="text"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter number"
                        {...field}
                        type="text"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your local</FormLabel>
                    <FormControl>
                      <FormAddressSelects />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your note</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-28"
                        placeholder="Enter note here..."
                        {...field}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter address"
                        {...field}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-8 w-full bg-foreground text-background"
              >
                Calculate prices
              </Button>
            </form>
          </Form>
        </div>
      )}
      {orderRequest && productsRequest && (
        <ConfirmDialog
          orderRequest={orderRequest}
          productsRequest={productsRequest}
          isOpen={isDialogOpen}
          onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
        />
      )}
    </>
  );
}

function createRequests({
  order,
  data,
  customerSession,
}: {
  order: OrderType;
  data: z.infer<typeof FormSchema>;
  customerSession: CustomerType;
}) {
  const productsRequest: ProductRequest[] = order?.products.map((prod) => ({
    name: prod.name,
    quantity: 1,
    weight: 1, // dynamic after
  }));

  const orderRequest: OrderRequest = {
    id: generate(12),
    pick_name: "Game store HCM",
    pick_province: "TP. Hồ Chí Minh",
    pick_district: "Quận 3",
    pick_ward: "Phường 1",
    pick_address: "590 CMT8 P.11",
    pick_tel: "0922262456",
    tel: data?.phone || "0123456789",
    name: data?.name || customerSession?.name || "Unknown",
    address: data?.address || customerSession?.address || "Unknown",
    province: data?.province || customerSession?.province || "Unknown",
    district: data?.district || customerSession?.district || "Unknown",
    ward: data?.ward || customerSession?.ward || "Unknown",
    hamlet: "Khác",
    is_freeship: "1",
    pick_money: 0,
    note: order?.note ?? "Khong",
    value: order?.price || 0,
    pick_option: "cod",
    email: "test@gmail.com",
    return_email: "test2@gmail.com",
  };

  const shipFeesRequest: OrderFeesParams = {
    pick_province: "TP. Hồ Chí Minh",
    pick_district: "Quận 3",
    pick_ward: "Phường 1",
    pick_address: "590 CMT8 P.11",
    province: data?.province || customerSession?.province || "Unknown",
    district: data?.district || customerSession?.district || "Unknown",
    ward: data?.ward || customerSession?.ward || "Unknown",
    address: data?.address || customerSession?.address || "Unknown",
    weight: 3000,
    value: order?.price || 0,
    deliver_option: "xteam",
  };

  return {
    productsRequest,
    orderRequest,
    shipFeesRequest,
  };
}
