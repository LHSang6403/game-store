"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import useProductFilter from "@/zustand/useProductFilter";

export default function CategoryCard({
  category,
  category_img,
}: {
  category: string;
  category_img: string;
}) {
  const { categories, setCategories } = useProductFilter();

  const handleCategoryClick = () => {
    if (categories.includes(category)) {
      setCategories(categories.filter((category) => category !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  return (
    <Badge
      onClick={handleCategoryClick}
      variant="secondary"
      className={`flex h-fit w-fit flex-col items-center gap-4 overflow-ellipsis whitespace-nowrap rounded-xl from-[#9633ed51] via-[#f22b9c4c] to-[#fd7c3654] px-5 pb-3 pt-2 transition duration-300 ease-in-out hover:scale-[1.01] hover:cursor-pointer hover:bg-gradient-to-r sm:w-full
         ${categories.includes(category) ? "bg-gradient-to-r" : ""}`}
    >
      <div className="h-20">
        <Image
          alt="Category"
          src={category_img}
          className="object-fit !relative h-[100%] max-w-[100%]"
          priority
          quality={100}
          fill
        />
      </div>
      <span className="">{category}</span>
    </Badge>
  );
}
