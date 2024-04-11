import { readAllCategories } from "@/app/_actions/product";
import CategoryCard from "@app/(main)/product/Components/CategoryCard";

export default async function CategoryCards() {
  const categories = await readAllCategories();

  return (
    <ul
      className="mx-auto flex h-fit max-w-[1000px] flex-row justify-center overflow-x-auto pb-2 
    xl:mx-auto xl:w-[80%] sm:w-full"
    >
      {categories?.data?.map((each, index: number) => (
        <li className="mx-2" key={index}>
          <CategoryCard data={each} />
        </li>
      ))}
    </ul>
  );
}
