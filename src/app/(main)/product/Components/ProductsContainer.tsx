"use client";

import Product from "@/components/Items/Product";
import PaginationButtons from "@app/(main)/product/Components/PaginationButtons";
import type { ProductType } from "@utils/types/index";
import useProductFilter from "@/zustand/useProductFilter";
import { Button } from "@components/ui/button";
import { useState, useEffect } from "react";
import { MAX_PRICE } from "@/zustand/useProductFilter";

export default function ProductsContainer({
  products,
  isBestSeller,
}: {
  products: ProductType[];
  isBestSeller?: boolean;
}) {
  const { brands, categories, endPrice, removeAllFilters } = useProductFilter();
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  // Pagination
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
  const currentItems = filteredProducts.slice(startIndex, endIndex + 1);

  // Filter products whenever categories, brands, or endPrice changes
  useEffect(() => {
    const filtered = products.filter((product) => {
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

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [brands, categories, endPrice, products]);

  function onPageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  const isHide =
    (brands?.length > 0 || categories?.length > 0 || endPrice < MAX_PRICE) &&
    isBestSeller;

  return (
    <>
      {isBestSeller && !isHide && (
        <h2 className="text-left text-xl font-medium">Sản phẩm bán chạy</h2>
      )}
      {!isHide && (
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
              }}
              variant="ghost"
              className="hover:bg- border border-cpurple"
            >
              Xóa bộ lọc
            </Button>
          )}
          {!isBestSeller && (
            <PaginationButtons
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          )}
        </div>
      )}
    </>
  );
}
