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
import { useState, useEffect, useCallback, useMemo } from "react";
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
    staleTime: 60 * (60 * 1000),
  });

  const [productStorages, setProductStorages] = useState<ProductStorageType[]>(
    defaultProductStorages ?? []
  );

  const handleCheckboxChange = useCallback(
    (storage: StorageType) => {
      setProductStorages((prev) =>
        prev.some((productStorage) => productStorage.storage_id === storage.id)
          ? prev.filter(
              (productStorage) => productStorage.storage_id !== storage.id
            )
          : [
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
            ]
      );
    },
    [productStorages]
  );

  const handleQuantityChange = useCallback(
    (value: number, storageId: string) => {
      setProductStorages((prev) =>
        prev.map((productStorage) =>
          productStorage.storage_id === storageId
            ? { ...productStorage, quantity: value }
            : productStorage
        )
      );
    },
    []
  );

  useEffect(() => {
    onValuesChange(productStorages);
  }, [productStorages]);

  const processedStorages = useMemo(() => {
    return storages?.data?.map((storage) => {
      const isChecked = productStorages.some(
        (item) => item.storage_id === storage.id
      );

      const defaultValue =
        defaultProductStorages && defaultProductStorages.length > 0
          ? defaultProductStorages
              .find(
                (defaultStorage) => defaultStorage.storage_id === storage.id
              )
              ?.quantity.toString() ?? ""
          : "";

      return { storage, isChecked, defaultValue };
    });
  }, [storages, productStorages, defaultProductStorages]);

  return (
    <Card>
      <CardHeader className="md:pb-4">Kho lưu trữ sản phẩm</CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {isStorageSuccess &&
          processedStorages?.map(
            ({ storage, isChecked, defaultValue }, index) => (
              <Card
                key={index}
                className="flex h-full w-full flex-col items-start justify-between gap-4 px-4 py-3 md:col-span-2 md:w-full md:flex-row"
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
                    defaultValue={defaultValue}
                    isDisabled={!isChecked}
                    onValueChange={(value) =>
                      handleQuantityChange(value, storage.id)
                    }
                  />
                </div>
              </Card>
            )
          )}
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
      form.setValue("storage_quantity", "");
    }
  }, [isDisabled]);

  const handleFormChange = useCallback(
    (data: z.infer<typeof FormSchema>) => {
      onValueChange(Number(data.storage_quantity));
    },
    [onValueChange]
  );

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(handleFormChange)}>
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
                  className="h-9 w-full md:w-24"
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
