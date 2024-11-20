"use client";

import { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import useProductFilter from "@/zustand/useProductFilter";
import { CategoryType } from "@/utils/types";
import ImageWrapper from "@/components/ImageWrapper";

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
      className={`flex h-fit w-full flex-col items-center gap-4 overflow-ellipsis whitespace-nowrap rounded-xl from-[#9633ed51] via-[#f22b9c4c] to-[#fd7c3654] pb-4 transition duration-300 ease-in-out hover:scale-[1.01] hover:cursor-pointer hover:bg-gradient-to-r md:w-52
         ${categories.includes(category.id) ? "bg-gradient-to-r" : ""}`}
    >
      <ImageWrapper
        src={category.image}
        width={150}
        height={150}
        alt="Category"
        isLoading={!category.image}
        className="h-36 w-full shadow-none md:h-48"
        customLoadingClassName="rounded-lg rounded-tl-[24px]"
      />
      <span className="">{category.name}</span>
    </Badge>
  );
}
