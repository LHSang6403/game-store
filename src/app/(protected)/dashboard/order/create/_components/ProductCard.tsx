"use client";

import { useMemo, useCallback } from "react";
import { ProductWithDescriptionAndStorageType } from "@utils/types";
import formatCurrency from "@/utils/functions/formatCurrency";

export default function ProductCard({
  prod,
  onAdd,
}: {
  prod: ProductWithDescriptionAndStorageType;
  onAdd: () => void;
}) {
  const isSoldOut = useMemo(
    () => prod.product_storages.length === 0,
    [prod.product_storages.length]
  );

  const productStoragesDisplay = useCallback(() => {
    if (isSoldOut) return <span>Hết hàng</span>;

    return (
      <div>
        Đang có sẵn:{" "}
        {prod.product_storages.map((productStorage, index) => (
          <span key={index}>
            {productStorage.quantity} SP tại {productStorage.storage_name}
            {index !== prod.product_storages.length - 1 && ", "}
          </span>
        ))}
      </div>
    );
  }, [prod.product_storages, isSoldOut]);

  return (
    <div
      className={`h-fit w-full rounded-lg border px-3 py-2 hover:bg-foreground/5 ${
        isSoldOut ? "text-foreground/50 hover:!cursor-not-allowed" : ""
      }`}
    >
      <div className="flex flex-row items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className={`h-5 w-5  ${
            isSoldOut ? "hover:!cursor-not-allowed" : "hover:cursor-pointer"
          }`}
          onClick={() => {
            if (!isSoldOut) onAdd();
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div className="text-sm font-medium">
          {prod.product.brand} {prod.product.name}
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="mt-0.5 text-sm font-medium">
          {formatCurrency(prod.product.price)} VNĐ
        </div>
      </div>
      <div className="line-clamp-1 overflow-ellipsis text-xs font-light">
        {prod.product.description}
      </div>
      <div className="mt-0.5 line-clamp-2 overflow-ellipsis text-xs font-medium">
        {productStoragesDisplay()}
      </div>
    </div>
  );
}
