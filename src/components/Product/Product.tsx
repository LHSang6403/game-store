import Image from "next/image";
import Link from "next/link";
import type { ProductType } from "@utils/types/index";

export default function Product({ data }: { data: ProductType }) {
  return (
    <Link
      href="/product"
      className="w-48 sm:w-full h-56 sm:h-44 overflow-hidden bg-foreground/5 hover:bg-foreground/10 hover:scale-[1.02] transition duration-300 ease-in-out"
    >
      <div className="w-48 sm:w-full h-36 sm:h-28">
        <Image
          alt="Category"
          src={data.images[0]}
          className="object-contain !w-full !relative"
          layout="fill"
        />
      </div>
      <div className="w-full h-fit py-1 px-4">
        <h2 className="sm:text-sm font-medium text-center overflow-ellipsis line-clamp-1">
          {data.brand}
        </h2>
        <h1 className="text-xl sm:text-base font-semibold overflow-ellipsis line-clamp-1">
          {data.name}
        </h1>
      </div>
    </Link>
  );
}
