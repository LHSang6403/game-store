"use client";

import { useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import useProductFilter from "@/zustand/useProductFilter";
import { CategoryType } from "@/utils/types";

export default function CategoryCard({ category }: { category: CategoryType }) {
  const { categories, setCategories } = useProductFilter();

  const handleCategoryClick = useCallback(() => {
    if (categories.includes(category.id)) {
      setCategories(categories.filter((cate) => cate !== category.id));
    } else {
      setCategories([...categories, category.id]);
    }
  }, [categories]);

  return (
    <Badge
      onClick={handleCategoryClick}
      variant="secondary"
      className={`flex h-fit w-full flex-col items-center gap-4 overflow-ellipsis whitespace-nowrap rounded-xl from-[#9633ed51] via-[#f22b9c4c] to-[#fd7c3654] px-5 pb-3 pt-2 transition duration-300 ease-in-out hover:scale-[1.01] hover:cursor-pointer hover:bg-gradient-to-r md:w-56
         ${categories.includes(category.id) ? "bg-gradient-to-r" : ""}`}
    >
      <div className="h-20 sm:h-auto">
        <Image
          alt="Category"
          src={category.image}
          className="object-fit !relative h-[100%] max-w-[100%]"
          priority
          quality={100}
          fill
        />
      </div>
      <span className="">{category.name}</span>
    </Badge>
  );
}
