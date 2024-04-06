"use client";

import { useQuery } from "@tanstack/react-query";
import { readStorages } from "@app/_actions/storage";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
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
    <Card>
      <CardHeader className="pb-4">Kho lưu trữ sản phẩm</CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {isStorageSuccess &&
          storages.data &&
          storages.data.map((storage: StorageType, index) => {
            const isChecked = productStorages?.some(
              (item) => item.storage_id === storage.id
            );

            return (
              <Card
                key={index}
                className="flex h-full w-full flex-row items-start justify-between gap-4 px-4 py-3 xl:col-span-2 sm:w-full sm:flex-col"
              >
                <div className="flex w-full flex-col gap-2">
                  <div className="flex items-center space-x-3">
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
                  <CardDescription className="w-full text-foreground/70">
                    {storage.address}, {storage.ward}, {storage.district},{" "}
                    {storage.province}
                  </CardDescription>
                </div>
                <div className="w-full">
                  <QuantityForm
                    defaultValue={
                      defaultProductStorages &&
                      defaultProductStorages.length > 0
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
              </Card>
            );
          })}
      </CardContent>
    </Card>
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
    mode: "onChange",
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
                  className="h-9 w-24 border-[#E5E7EB] sm:w-full"
                />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
