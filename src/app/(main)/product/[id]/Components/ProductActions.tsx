import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import formatCurrency from "@utils/functions/formatCurrency";
import { useOrder } from "@/zustand/useOrder";
import { toast } from "sonner";
import type { ProductWithDescriptionAndStorageType } from "@utils/types/index";

export default function ProductActions({
  product,
}: {
  product: ProductWithDescriptionAndStorageType;
}) {
  const { addProduct } = useOrder();

  const handleAddToCart = () => {
    addProduct(product);
    toast.success("Added successfully!");
  };

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
          {formatCurrency(product.price)} VND
        </div>
        <div className="line-clamp-3 w-full overflow-ellipsis font-light">
          {product.description}
        </div>
      </div>
      <div>
        <div className="-mt-2 text-sm font-medium text-foreground">
          Availble:{" "}
          <span className="font-light">{product.storage[0].quantity}</span>
        </div>
        <div className="text-sm font-medium text-foreground">
          Storage:{" "}
          <span className="font-light">{product.storage[0].address}</span>
        </div>
        <div className="text-sm font-medium text-foreground">
          Sold: <span className="font-light">{product.sold_quantity}</span>
        </div>
        <hr className="my-2 w-[60%] rounded border dark:opacity-20 sm:w-full"></hr>
        <div className="font-medium text-foreground">Choose options:</div>
        <div className="mt-0.5">
          <Select>
            <SelectTrigger className="w-[180px] border-none ">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Options</SelectLabel>
                {product.options.map((option: string, index: number) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row sm:px-1">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Fast delivery
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Free return
            </label>
          </div>
        </div>
      </div>
      {product.storage[0].quantity ? (
        <Button
          className="h-fit w-fit text-background sm:w-full"
          onClick={handleAddToCart}
        >
          Cart now
        </Button>
      ) : (
        <div className="font-medium text-foreground">
          This product is currently sold out!
        </div>
      )}
    </>
  );
}
