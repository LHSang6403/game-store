"use client";

import Product from "@components/Product/Product";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";
import type { ProductType } from "@utils/types/index";
import useProductFilter from "@/zustand/useProductFilter";
import { Button } from "@components/ui/button";
import { toast } from "sonner";
import { MAX_PRICE } from "@/zustand/useProductFilter";

export default function ProductsContainer({
  products,
}: {
  products: ProductType[];
}) {
  const { brands, categories, endPrice, removeAllFilters } = useProductFilter();

  // Filter products based on the selected brands, categories, and highest price
  const filteredProducts = products.filter((product) => {
    const isBrandMatch =
      brands?.length === 0 ||
      brands?.includes("All") ||
      brands?.includes(product.brand);

    const isCategoryMatch =
      categories?.length === 0 ||
      categories?.includes("All") ||
      categories?.includes(product.category);

    const isPriceMatch = endPrice === 0 || product.price <= endPrice;

    return isBrandMatch && isCategoryMatch && isPriceMatch;
  });

  console.log(filteredProducts);

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-6">
      <div className="grid h-fit w-fit grid-cols-4 justify-items-center gap-5 xl:grid-cols-3 lg:grid-cols-2 sm:gap-2">
        {filteredProducts.length > 0 &&
          filteredProducts.map((each: ProductType, index: number) => (
            <Product key={index} data={each} />
          ))}
      </div>

      {(brands?.length > 0 ||
        categories?.length > 0 ||
        endPrice < MAX_PRICE) && (
        <Button
          onClick={() => {
            removeAllFilters();
            toast.success("All filters are removed.");
          }}
          variant="outline"
          className=""
        >
          Remove filters{" "}
        </Button>
      )}
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
