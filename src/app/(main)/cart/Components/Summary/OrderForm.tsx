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
import { createOrder } from "../../_actions/order";
import { useMutation } from "@tanstack/react-query";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is a compulsory." }),
  phone: z
    .string()
    .min(6, { message: "Must be a valid mobile number" })
    .max(12, { message: "Must be a valid mobile number" }),
  address: z
    .string()
    .min(5, { message: "Your address is a compulsory for shipping." }),
  note: z.string(),
});

export default function OrderForm() {
  const { order, removeAll } = useOrder();
  const { session } = useSession();

  // fill customer info automatically if logged in
  const customerSession = session as CustomerType;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: customerSession?.name || "",
      phone: customerSession?.phone || "",
      address: customerSession?.address || "",
      note: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (orderData: OrderType) => await createOrder(orderData),
    onSuccess: (result) => {
      console.log(result);

      if (result.error) {
        toast.error("Error creating order.");
      }

      toast.success("Order is created successfully!");
      removeAll();
    },
    onError: (error) => {
      toast.error("Error creating order.");
      console.log(error);
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const orderData: OrderType = {
      id: order?.id || "",
      created_at: new Date().toISOString(),
      prod_ids: order?.prod_ids || [],
      prod_names: order?.prod_names || [],
      prod_quantities: order?.prod_quantities || [],
      state: order?.state || "pending",
      customer_id: customerSession?.id || "",
      customer_name: data.name || customerSession?.name || "Unknown",
      price: order?.price || 0,
      note: data?.note || "",
      address: data?.address || customerSession?.address || "Unknown",
    };

    mutation.mutate(orderData);
  }

  return (
    <>
      {order && (
        <div className="w-64 xl:w-[500px] sm:w-auto h-fit flex flex-col gap-2 border rounded-md px-3 py-2">
          <h2 className="text-lg font-semibold">Your order summary</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-3"
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
                        disabled
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
                        disabled
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
              <Button
                type="submit"
                className="w-full bg-foreground text-background"
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