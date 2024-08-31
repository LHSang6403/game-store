import { readAllCategories } from "@/app/_actions/product";
import CategoryCard from "@app/(main)/product/Components/CategoryCard";

export default async function CategoryCards() {
  const categories = await readAllCategories();

  return (
    <ul className="flex h-fit w-auto max-w-[1000px] flex-wrap justify-start gap-3 pb-2 md:max-w-full sm:grid sm:grid-cols-2">
      {categories?.data?.map((each, index: number) => (
        <li key={index}>
          <CategoryCard
            category={each.category}
            category_img={each.category_img}
          />
        </li>
      ))}
    </ul>
  );
}
