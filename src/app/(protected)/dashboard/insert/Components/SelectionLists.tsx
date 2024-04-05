"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  InsertedProductStorageType,
  ProductStorageType,
  StorageType,
} from "@/utils/types";
import { useState } from "react";
import ProductStorageItem from "./ProductStorageItem";
import { Button } from "@/components/ui/button";
import { updateProductStoragesQuantity } from "@app/_actions/product_storage";
import { toast } from "sonner";
import StorageItem from "./StorageItem";

export default function SelectionLists({
  storages,
  productStorages,
}: {
  storages: StorageType[];
  productStorages: ProductStorageType[];
}) {
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
          setInsertedProductStorageData([]);

          return "Cập nhật thành công.";
        },
      }
    );
  }

  return (
    <>
      <div className="flex flex-row gap-2 overflow-hidden lg:flex-col lg:gap-4">
        <div className="flex h-full w-1/2 flex-col gap-2 overflow-auto lg:w-full">
          {storages.map((storage, index) => (
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
              {productStorages
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
    </>
  );
}
