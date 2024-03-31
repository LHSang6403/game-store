"use client";

import { ProductWithDescriptionAndStorageType } from "@utils/types";
import formatCurrency from "@/utils/functions/formatCurrency";

export default function ProductCard({
  prod,
  onAdd,
}: {
  prod: ProductWithDescriptionAndStorageType;
  onAdd: () => void;
}) {
  return (
    <div
      onClick={() => {}}
      className="h-fit w-full rounded-lg border px-3 py-2 hover:bg-foreground/5"
    >
      <div className="flex flex-row items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-5 w-5 hover:cursor-pointer"
          onClick={onAdd}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div className="text-sm font-medium">
          {prod.brand} {prod.name}
        </div>
      </div>
      <div className="flex flex-row items-end gap-2">
        <div className="mt-0.5 text-sm font-medium">
          {formatCurrency(prod.price)} VNĐ
        </div>
        <div className="mb-[2px] mt-0.5 text-xs font-light">
          Có sẵn: {prod.storage[0].quantity} tại kho {prod.storage[0].address}
        </div>
      </div>
      <div className="line-clamp-1 overflow-ellipsis text-xs font-light">
        {prod.description}
      </div>
    </div>
  );
}
