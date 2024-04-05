"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { readStorages } from "@app/_actions/storage";
import { useState } from "react";
import { readAllProductStorages } from "@/app/_actions/product_storage";
import { ChevronsRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import ProductStorageItem from "./Components/ProductStorageItem";
import { Button } from "@/components/ui/button";
import StorageItem from "./Components/StorageItem";
import { InsertedProductStorageType } from "@/utils/types";
import Link from "next/link";
import { updateProductStoragesQuantity } from "@app/_actions/product_storage";
import { toast } from "sonner";

export default function page() {
  const queryClient = useQueryClient();

  const { data: storages, isSuccess: isStoragesSuccess } = useQuery({
    queryKey: ["storages", "all"],
    queryFn: () => readStorages(),
    staleTime: 1000 * 60 * 60,
  });

  const { data: productStorages, isSuccess: isProductStoragesSuccess } =
    useQuery({
      queryKey: ["product-storage", "all"],
      queryFn: () => readAllProductStorages(),
      staleTime: 1000 * 60 * 60,
    });

  const [selectedStorage, setSelectedStorage] =
    useState<string>("Kho Hồ Chí Minh");

  const [insertedProductStorageData, setInsertedProductStorageData] = useState<
    InsertedProductStorageType[]
  >([]);

  async function handleSubmit() {
    toast.promise(
      async () =>
        await updateProductStoragesQuantity({
          addProductStorageList: insertedProductStorageData,
        }),
      {
        loading: "Đang cập nhật...",
        success: () => {
          queryClient.invalidateQueries({
            queryKey: ["product-storage", "all"],
          });

          setInsertedProductStorageData([]);

          return "Cập nhật thành công.";
        },
      }
    );
  }

  return (
    <section className="flex flex-col gap-4 lg:flex-col">
      <div className="flex flex-col">
        <h1 className="mt-2 text-2xl font-medium">Nhập thêm sản phẩm</h1>
        <Link
          href="/dashboard/product/create"
          className="flex w-fit flex-row items-center text-sm font-medium"
        >
          Nhập mới sản phẩm
          <ChevronsRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="flex flex-row gap-2 overflow-hidden lg:flex-col lg:gap-4">
        <div className="flex h-full w-1/2 flex-col gap-2 overflow-auto lg:w-full">
          {isStoragesSuccess &&
            storages?.data?.map((storage, index) => (
              <div key={index} onClick={() => setSelectedStorage(storage.name)}>
                <StorageItem
                  storage={storage}
                  isSelected={storage.name === selectedStorage}
                />
              </div>
            ))}
        </div>
        <div className="h-full w-1/2 lg:w-full">
          <Card className="h-full w-full overflow-hidden pr-1">
            <CardHeader className="p-3">
              Sản phẩm trong {selectedStorage}
            </CardHeader>
            <CardContent className="flex h-[510px] w-full flex-col gap-2 overflow-auto pl-3 pr-2">
              {isProductStoragesSuccess &&
                productStorages.data &&
                productStorages.data
                  .filter(
                    (prod_storage) =>
                      prod_storage.storage_name === selectedStorage
                  )
                  .map((product_storage, index) => (
                    <div className="h-fit w-full" key={index}>
                      <ProductStorageItem
                        product_storage={product_storage}
                        onValueChange={(value) => {
                          setInsertedProductStorageData((prev) => {
                            const newInsertedProductStorageData = prev.filter(
                              (item) =>
                                item.product_storage_id !== product_storage.id
                            );

                            if (value > 0) {
                              newInsertedProductStorageData.push({
                                product_storage_id: product_storage.id,
                                inserted_quantity: value,
                              });
                            }

                            return newInsertedProductStorageData;
                          });
                        }}
                      />
                    </div>
                  ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <Button
        disabled={insertedProductStorageData.length === 0}
        onClick={() => handleSubmit()}
        className="ml-auto w-fit text-background sm:w-full"
      >
        Hoàn tất
      </Button>
    </section>
  );
}
