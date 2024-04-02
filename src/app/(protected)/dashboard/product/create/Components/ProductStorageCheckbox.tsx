"use client";

import { useQuery } from "@tanstack/react-query";
import { readStorages } from "@app/_actions/storage";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { useState, useEffect } from "react";
import { StorageType, ProductStorageType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@components/ui/form";
import { v4 as uuidv4 } from "uuid";

export default function ProductStorageCheckbox({
  defaultProductStorages,
  onValuesChange,
}: {
  defaultProductStorages?: ProductStorageType[];
  onValuesChange: (values: ProductStorageType[]) => void;
}) {
  const { data: storages, isSuccess: isStorageSuccess } = useQuery({
    queryKey: ["storages", "all"],
    queryFn: () => readStorages(),
    staleTime: 1000 * 60 * 60,
  });

  const [productStorages, setProductStorages] = useState<ProductStorageType[]>(
    defaultProductStorages ?? []
  );

  const handleCheckboxChange = (storage: StorageType) => {
    if (
      productStorages.some(
        (productStorage) => productStorage.storage_id === storage.id
      )
    ) {
      setProductStorages((prev) =>
        prev.filter(
          (productStorage) => productStorage.storage_id !== storage.id
        )
      );
    } else {
      setProductStorages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          created_at: new Date().toISOString(),
          product_id: "",
          storage_id: storage.id,
          quantity: 0,
          product_name: "",
          storage_name: storage.name,
        },
      ]);
    }
  };

  const handleQuantityChange = (value: number, storageId: string) => {
    setProductStorages((prev) =>
      prev.map((productStorage) =>
        productStorage.storage_id === storageId
          ? { ...productStorage, quantity: value }
          : productStorage
      )
    );
  };

  useEffect(() => {
    onValuesChange(productStorages);
  }, [productStorages]);

  return (
    <div className="mt-6 flex flex-col gap-1">
      <FormLabel className="pb-1">Kho vận</FormLabel>
      {isStorageSuccess &&
        storages.data &&
        storages.data.map((storage: StorageType, index) => {
          const isChecked = productStorages?.some(
            (item) => item.storage_id === storage.id
          );

          return (
            <div
              key={index}
              className="flex h-fit w-full flex-row justify-between gap-4 sm:w-full sm:flex-col"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="text-background"
                  checked={isChecked}
                  onCheckedChange={() => handleCheckboxChange(storage)}
                  id={storage.name}
                />
                <label className="line-clamp-1 overflow-ellipsis text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {storage.name}
                </label>
              </div>
              <QuantityForm
                defaultValue={
                  defaultProductStorages && defaultProductStorages.length > 0
                    ? defaultProductStorages
                        .find(
                          (defaultStorage) =>
                            defaultStorage.storage_id === storage.id
                        )
                        ?.quantity.toString() ?? ""
                    : ""
                }
                isDisabled={!isChecked}
                onValueChange={(value) =>
                  handleQuantityChange(value, storage.id)
                }
              />
            </div>
          );
        })}
    </div>
  );
}

const FormSchema = z.object({
  storage_quantity: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Vui lòng nhập số lượng.",
    }),
});

export function QuantityForm({
  defaultValue,
  isDisabled,
  onValueChange,
}: {
  defaultValue: string;
  isDisabled: boolean;
  onValueChange: (quantity: number) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      storage_quantity: defaultValue,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (isDisabled) {
      form.setValue("storage_quantity", "0");
    }
  }, [isDisabled]);

  async function onChange(data: z.infer<typeof FormSchema>) {
    onValueChange(Number(data.storage_quantity));
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onChange)}>
        <FormField
          control={form.control}
          name="storage_quantity"
          render={({ field }) => (
            <FormItem className="flex flex-col items-end">
              <FormControl>
                <Input
                  disabled={isDisabled}
                  placeholder="Số lượng"
                  {...field}
                  type="text"
                  onChange={field.onChange}
                  className="h-9 w-24 border-[#E5E7EB]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
