import { Button } from "@/components/ui/button";
import formatCurrency from "@utils/functions/formatCurrency";
import { useOrder, OrderState } from "@/zustand/useOrder";
import { toast } from "sonner";
import type {
  ProductStorageType,
  ProductWithDescriptionAndStorageType,
} from "@utils/types/index";
import { useState, useEffect } from "react";

export default function ProductActions({
  product,
}: {
  product: ProductWithDescriptionAndStorageType;
}) {
  const { addProduct } = useOrder() as OrderState;
  const [isSoldOut, setIsSoldOut] = useState(false);

  const handleAddToCart = () => {
    addProduct(product);
    toast.success("Thêm vào giỏ hàng thành công!");
  };

  useEffect(() => {
    if (product.product_storages.length <= 0) setIsSoldOut(true);

    product.product_storages.map((productStore: ProductStorageType) => {
      if (productStore.quantity <= 0) {
        setIsSoldOut(true);
      }
    });
  }, []);

  return (
    <>
      <div>
        <div className="mb-1 flex flex-row items-center text-lg text-yellow-400">
          {Array.from({ length: 5 }).map((_, index: number) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-0.5 h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
          ))}
        </div>
        <div className="text-xl font-semibold">
          {formatCurrency(product.product.price)} VNĐ
        </div>
        <div className="line-clamp-3 w-full overflow-ellipsis font-light">
          {product.product.description}
        </div>
      </div>
      <hr className="w-[60%] rounded border dark:opacity-20 sm:w-full"></hr>
      <div className="flex flex-col gap-1">
        <div className="text-sm font-medium text-foreground">
          Đã bán:{" "}
          <span className="font-light">{product.product.sold_quantity}</span>
        </div>
        {!isSoldOut && (
          <span className="text-sm font-light text-foreground">Còn hàng</span>
        )}
      </div>
      {isSoldOut ? (
        <div className="text-sm font-light text-foreground">
          Sản phẩm này hiện đang hết hàng.
        </div>
      ) : (
        <Button
          disabled={isSoldOut}
          className="h-fit w-fit text-background sm:w-full"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </Button>
      )}
    </>
  );
}
