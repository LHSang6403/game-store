"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  InsertedProductStorageType,
  ProductStorageType,
  StorageType,
} from "@/utils/types";
import { useState } from "react";
import ProductStorageItem from "@app/(protected)/dashboard/insert/Components/ProductStorageItem";
import { Button } from "@/components/ui/button";
import { updateProductStoragesQuantity } from "@app/_actions/product_storage";
import { toast } from "sonner";
import StorageItem from "@app/(protected)/dashboard/insert/Components/StorageItem";
import { useSession, SessionState } from "@/zustand/useSession";

export default function SelectionLists({
  storages,
  productStorages,
}: {
  storages: StorageType[];
  productStorages: ProductStorageType[];
}) {
  const { session } = useSession() as SessionState;

  const [selectedStorage, setSelectedStorage] =
    useState<string>("Kho Hồ Chí Minh");

  const [insertedProductStorageData, setInsertedProductStorageData] = useState<
    InsertedProductStorageType[]
  >([]);

  async function handleSubmit() {
    toast.promise(
      async () => {
        if (!session) throw new Error("Lỗi không xác định phiên đăng nhập.");

        const result = await updateProductStoragesQuantity({
          addProductStorageList: insertedProductStorageData,
          actor: {
            actorId: session.id,
            actorName: session.name,
          },
        });

        if (result.error) throw new Error(result.error);
      },
      {
        loading: "Đang cập nhật...",
        success: () => {
          setInsertedProductStorageData([]);

          return "Cập nhật thành công.";
        },
        error: (error: any) => {
          return error.message;
        },
      }
    );
  }

  return (
    <>
      <div className="flex flex-row gap-2 overflow-hidden lg:flex-col lg:gap-4">
        <div className="flex max-h-[572px] w-1/2 flex-col gap-2 overflow-auto pr-1 lg:w-full">
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
                              storage_name: product_storage.storage_name,
                              inserted_quantity: value,
                              product_name: product_storage.product_name,
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
        className="ml-auto w-fit text-background lg:w-full"
      >
        Hoàn tất
      </Button>
    </>
  );
}
