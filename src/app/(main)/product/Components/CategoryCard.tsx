"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import useProductFilter from "@/zustand/useProductFilter";

export default function CategoryCard({ data }: { data: string }) {
  const { setCategories } = useProductFilter();

  return (
    <Badge
      onClick={() => {
        setCategories([data]);
      }}
      variant="secondary"
      className="h-8 w-fit overflow-ellipsis whitespace-nowrap from-[#9633ed51] via-[#f22b9c4c] to-[#fd7c3654] transition duration-300 ease-in-out hover:scale-[1.01] hover:cursor-pointer hover:bg-gradient-to-r"
    >
      <div className="mb-1 mr-1 h-4 w-4">
        <Image
          alt="Category"
          src="/assets/images/gameIcon/i1.png"
          width={20}
          height={20}
        />
      </div>
      {data}
    </Badge>
  );
}
