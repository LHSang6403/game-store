import { readAllCategories } from "@/app/_actions/product";
import CategoryCard from "./CategoryCard";
import { ApiErrorHandlerServer } from "@/utils/errorHandler/apiErrorHandler";

export default async function CategoryCards() {
  const categoriesResponse = await readAllCategories();
  const categories = ApiErrorHandlerServer<string[]>({
    response: categoriesResponse,
  });

  return (
    <ul
      className="mx-auto flex h-fit max-w-[1000px] flex-row overflow-x-auto pb-2 
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
