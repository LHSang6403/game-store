import { readAllCategories } from "@/app/_actions/product";
import CategoryCard from "./CategoryCard";

export default async function CategoryCards() {
  const response = await readAllCategories();
  if (response.error) throw new Error(response.error);

  return (
    <ul
      className="mx-auto flex h-fit max-w-[1000px] flex-row overflow-x-auto pb-2 
    xl:mx-auto xl:w-[80%] sm:w-full"
    >
      {response?.data?.map((each, index: number) => (
        <li className="mx-2" key={index}>
          <CategoryCard data={each} />
        </li>
      ))}
    </ul>
  );
}
