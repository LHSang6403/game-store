import { readAllCategories } from "@/app/_actions/product";
import CategoryCard from "@app/(main)/product/Components/CategoryCard";

export default async function CategoryCards() {
  const categories = await readAllCategories();

  return (
    <ul className="mx-auto flex h-fit w-full max-w-[1000px] flex-row justify-center gap-3 overflow-x-auto pb-2 sm:justify-start">
      {categories?.data?.map((each, index: number) => (
        <li key={index}>
          <CategoryCard data={each} />
        </li>
      ))}
    </ul>
  );
}
