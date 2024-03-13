import { readAllCategories } from "@/app/_actions/product";
import CategoryCard from "./CategoryCard";
import { ApiErrorHandlerServer } from "@/utils/errorHandler/apiErrorHandler";

export default async function CategoryCards() {
  const categoriesResponse = ApiErrorHandlerServer<string[]>({
    response: await readAllCategories(),
  });

  return (
    <ul
      className="mx-auto flex h-fit max-w-[1000px] flex-row overflow-x-auto pb-2 
    xl:mx-auto xl:w-[80%] sm:w-full"
    >
      {categoriesResponse?.data?.map((each, index: number) => (
        <li className="mx-2" key={index}>
          <CategoryCard data={each} />
        </li>
      ))}
    </ul>
  );
}
