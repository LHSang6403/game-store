"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@components/ui/card";
import { ProductStorageType } from "@/utils/types";

const FormSchema = z.object({
  add_quantity: z
    .string()
    .refine(
      (val) =>
        val === "" ||
        (!Number.isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 0),
      {
        message: "Vui lòng nhập số dương.",
      }
    ),
});

export default function ProductStorageItem({
  product_storage,
  onValueChange,
}: {
  product_storage: ProductStorageType;
  onValueChange: (value: number) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      add_quantity: "",
    },
    mode: "onChange",
  });

  return (
    <Card className="flex h-20 w-full flex-row justify-between px-2 py-1">
      <div className="flex w-1/2 flex-col justify-between gap-1">
        <span className="font-medium">{product_storage.product_name}</span>
        <span className="text-sm">Tồn kho: {product_storage.quantity}</span>
      </div>
      <Form {...form}>
        <form
          onChange={() => {
            const value = parseInt(form.getValues().add_quantity);
            onValueChange(value);
          }}
          className="mb-1 ml-auto mt-auto w-fit"
        >
          <FormField
            control={form.control}
            name="add_quantity"
            render={({ field }) => (
              <FormItem className="flex flex-col items-end">
                <FormMessage />
                <FormControl>
                  <Input
                    placeholder="Nhập thêm"
                    {...field}
                    type="text"
                    onChange={field.onChange}
                    className="h-8 w-28"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Card>
  );
}
