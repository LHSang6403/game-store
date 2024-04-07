"use client";

import Product from "@components/Product/Product";
import PaginationButtons from "@app/(main)/product/Components/PaginationButtons";
import type { ProductType } from "@utils/types/index";
import useProductFilter from "@/zustand/useProductFilter";
import { Button } from "@components/ui/button";
import { useState } from "react";
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

  // Pagination
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
  const currentItems = filteredProducts.slice(startIndex, endIndex + 1);

  function onPageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center gap-6">
      <div className="grid h-fit w-fit grid-cols-4 justify-items-center gap-5 xl:grid-cols-3 lg:grid-cols-2 sm:gap-2">
        {currentItems.map((each: ProductType, index: number) => (
          <Product key={index} data={each} />
        ))}
      </div>
      {(brands?.length > 0 ||
        categories?.length > 0 ||
        endPrice < MAX_PRICE) && (
        <Button
          onClick={() => {
            removeAllFilters();
            toast.success("Đã xóa các bộ lọc.");
          }}
          variant="outline"
          className=""
        >
          Xóa bộ lọc
        </Button>
      )}
      <PaginationButtons
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
