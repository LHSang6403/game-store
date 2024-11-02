import { readAllCategories } from "@/app/_actions/product";
import CategoryCard from "@/app/(main)/product/_components/CategoryCard";

export default async function CategoryCards() {
  const categories = await readAllCategories();

  return (
    <ul className="md:flex h-fit w-auto md:max-w-[1000px] md:flex-wrap justify-start gap-3 pb-2 max-w-full grid grid-cols-2">
      {categories?.data?.map((each, index: number) => (
        <li  key={index}>
          <CategoryCard category={each} />
        </li>
      ))}
    </ul>
  );
}
