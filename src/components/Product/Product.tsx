import Image from "next/image";
import Link from "next/link";
import formatCurrency from "@utils/functions/formatCurrency";
import type { ProductType } from "@utils/types/index";

export default function Product({ data }: { data: ProductType }) {
  return (
    <Link
      href="/product"
      className="w-48 sm:w-full h-fit overflow-hidden text-foreground/90 bg-foreground/5 hover:text-foreground hover:bg-foreground/10 hover:scale-[1.02] transition duration-300 ease-in-out"
    >
      <div className="w-48 sm:w-full h-36 sm:h-28">
        <Image
          alt="Category"
          src={data.images[0]}
          className="object-contain !w-full !relative"
          layout="fill"
        />
      </div>
      <div className="w-full h-fit px-4 pb-3 pt-1">
        <h3 className="sm:text-md font-medium text-center overflow-ellipsis line-clamp-1">
          {data.brand}
        </h3>
        <h2 className="text-lg font-semibold overflow-ellipsis line-clamp-1">
          {data.name}
        </h2>
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row items-center text-yellow-500">
            <p className="text-sm">{data.rate}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p className="text-md">{formatCurrency(data.price)}</p>
        </div>
      </div>
    </Link>
  );
}
