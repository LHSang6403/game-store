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
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "@/zustand/useSession";
import { useOrder } from "@/zustand/useOrder";
import type { CustomerType, OrderType } from "@utils/types";
import { createOrder } from "@app/_actions/order";
import { useMutation } from "@tanstack/react-query";
// import generatePaymentUrl from "@app/_actions/payment";
import { requestOrder } from "@/app/_actions/GHTKShipment";
import { generate } from "randomstring";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is a compulsory." }),
  phone: z
    .string()
    .min(6, { message: "Must be a valid mobile number" })
    .max(12, { message: "Must be a valid mobile number" }),
  address: z
    .string()
    .min(5, { message: "Your address is a compulsory for shipping." }),
  ward: z
    .string()
    .min(5, { message: "Your address is a compulsory for shipping." }),
  district: z
    .string()
    .min(5, { message: "Your address is a compulsory for shipping." }),
  province: z
    .string()
    .min(5, { message: "Your address is a compulsory for shipping." }),
  note: z.string(),
});

export default function OrderForm() {
  const { order, removeAll, setShipment } = useOrder();
  const { session } = useSession();

  // fill customer info automatically if logged in
  const customerSession = session as CustomerType;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: customerSession?.name || "",
      phone: customerSession?.phone || "",
      address: customerSession?.address || "",
      ward: customerSession?.ward || "",
      district: customerSession?.district || "",
      province: customerSession?.province || "",
      note: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (orderData: OrderType) => await createOrder(orderData),
    onSuccess: () => {
      removeAll();
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // *** 9pay payment gateway ***

    // const result = await generatePaymentUrl(
    //   100000,
    //   "Sang's Order payment test 1.",
    //   `${window.location.href}/payment/success`
    // );
    // console.log("----result", result);

    // *** GHTK shipment ***

    const productsRequest = order?.prod_names.map((name, index) => ({
      name: name,
      quantity: order?.prod_quantities[index],
      weight: 0.1, // modify weights after
    }));

    const orderRequest = {
      id: generate(12),
      pick_name: "Game store HCM",
      pick_address: "590 CMT8 P.11",
      pick_province: "TP. Hồ Chí Minh",
      pick_district: "Quận 3",
      pick_ward: "Phường 1",
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
      note: order?.note ?? "Khong.",
      value: order?.price || 0,
      pick_option: "cod",
      email: "test@gmail.com",
      return_email: "test2@gmail.com",
    };

    toast.promise(
      async () => {
        const result = await requestOrder({
          products: productsRequest,
          order: orderRequest,
        });
        console.log("----result", result);

        // store label of response to zustand
        if (result.order) {
          setShipment("GHTK", result.order.label);
        }

        if (!result.success) {
          toast.error(result.message);
        } else {
          // *** Save to database after payment and shipment ***

          const orderData: OrderType = {
            id: order?.id || "",
            created_at: new Date().toISOString(),
            shipment_name: "GHTK",
            shipment_label: result.order.label || "",
            prod_ids: order?.prod_ids || [],
            prod_names: order?.prod_names || [],
            prod_quantities: order?.prod_quantities || [],
            state: order?.state || "pending",
            customer_id: customerSession?.id || "",
            customer_name: data.name || customerSession?.name || "Unknown",
            price: order?.price || 0,
            note: data?.note || "",
            address:
              data?.address +
                ", " +
                data?.ward +
                ", " +
                data?.district +
                ", " +
                data?.province ||
              customerSession?.address ||
              "Unknown",
          };

          mutation.mutateAsync(orderData);
          console.log("Order data:", orderData);
        }
      },
      {
        loading: "Creating order...",
        success: "Order is created successfully!",
        error: "Error creating order.",
      }
    );
  }

  return (
    <>
      {order && (
        <div className="flex h-fit w-full flex-col gap-2 rounded-md border px-3 py-2 pb-4">
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
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your note</FormLabel>
                    <FormControl>
                      <Textarea
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
              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ward</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter ward"
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
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter district"
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
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter province"
                        {...field}
                        type="text"
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
                Send order
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
