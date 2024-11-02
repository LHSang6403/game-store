"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  InsertedProductStorageType,
  ProductStorageType,
  StorageType,
} from "@/utils/types";
import { useCallback, useState } from "react";
import ProductStorageItem from "@/app/(protected)/dashboard/insert/_components/ProductStorageItem";
import { Button } from "@/components/ui/button";
import { updateProductStoragesQuantity } from "@app/_actions/product_storage";
import { toast } from "sonner";
import StorageItem from "@/app/(protected)/dashboard/insert/_components/StorageItem";
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

  const handleSubmit = useCallback(async () => {
    toast.promise(
      async () => {
        if (!session) throw new Error("Lỗi không xác định phiên đăng nhập.");

        await updateProductStoragesQuantity({
          addProductStorageList: insertedProductStorageData,
          actor: {
            actorId: session.id,
            actorName: session.name,
          },
        });
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
  }, [session, insertedProductStorageData]);

  const handleValueChange = useCallback(
    (
      product_storage_id: string,
      value: number,
      product_storage: ProductStorageType
    ) => {
      setInsertedProductStorageData((prev) => {
        const newInsertedProductStorageData = prev.filter(
          (item) => item.product_storage_id !== product_storage_id
        );

        if (value > 0) {
          newInsertedProductStorageData.push({
            product_storage_id,
            storage_name: product_storage.storage_name,
            inserted_quantity: value,
            product_name: product_storage.product_name,
          });
        }

        return newInsertedProductStorageData;
      });
    },
    []
  );

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
                      onValueChange={(value) =>
                        handleValueChange(
                          product_storage.id,
                          value,
                          product_storage
                        )
                      }
                    />
                  </div>
                ))}
            </CardContent>
          </Card>
          <Button
            disabled={insertedProductStorageData.length === 0}
            onClick={handleSubmit}
            className="mt-2 w-full text-background lg:mt-4"
          >
            Hoàn tất
          </Button>
        </div>
      </div>
    </>
  );
}
