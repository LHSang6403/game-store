import Product from "@components/Product/Product";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { readProducts } from "@app/(main)/product/_actions/product";
import type { ProductType } from "@utils/types/index";

export default async function ProductsContainer() {
  const productsResponse = (await readProducts({ limit: 10, offset: 0 })) as {
    data: ProductType[];
    error: unknown;
  };

  if (productsResponse.error) {
    return <div>Product not found</div>;
  }

  return (
    <div className="w-full h-fit flex flex-col gap-6 items-center justify-center">
      <div className="w-fit h-fit grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-5 sm:gap-2 justify-items-center">
        {productsResponse.data &&
          productsResponse.data.map((each: ProductType, index: number) => (
            <Product key={index} data={each} />
          ))}
      </div>
      <PaginationButtons />
    </div>
  );
}

function PaginationButtons() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="h-9" href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="h-9" href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="h-9" href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="h-9" href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className="sm:hidden">
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className="h-9" href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
