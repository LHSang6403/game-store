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
import { readProducts } from "@/app/_actions/product";
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
    <div className="flex h-fit w-full flex-col items-center justify-center gap-6">
      <div className="grid h-fit w-fit grid-cols-4 justify-items-center gap-5 xl:grid-cols-3 lg:grid-cols-2 sm:gap-2">
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
