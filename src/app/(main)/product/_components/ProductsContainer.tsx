"use client";

import Product from "@/components/Items/Product";
import PaginationButtons from "@/app/(main)/product/_components/PaginationButtons";
import type { ProductType } from "@utils/types/index";
import useProductFilter from "@/zustand/useProductFilter";
import { Button } from "@components/ui/button";
import { useState, useEffect, useMemo, useCallback } from "react";
import { MAX_PRICE } from "@/zustand/useProductFilter";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";

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
        categories?.length === 0 || categories?.includes(product.category_id);

      const isPriceMatch = endPrice === 0 || product.price <= endPrice;

      return isBrandMatch && isCategoryMatch && isPriceMatch;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [brands, categories, endPrice, products]);

  const onPageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const isHide = useMemo(() => {
    return (
      (brands?.length > 0 || categories?.length > 0 || endPrice < MAX_PRICE) &&
      isBestSeller
    );
  }, [brands, categories, endPrice, isBestSeller]);

  const isShowClearFilter = useMemo(() => {
    return brands?.length > 0 || categories?.length > 0 || endPrice < MAX_PRICE;
  }, [brands, categories, endPrice]);

  return (
    <>
      {isBestSeller && !isHide && (
        <h2 className="text-left text-xl font-medium">Sản phẩm bán chạy</h2>
      )}
      {!isHide && (
        <div className="center h-fit w-full flex-col gap-6">
          <div className="grid h-fit w-full grid-cols-2 justify-items-center gap-2 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
            {currentItems.map((each: ProductType, index: number) => (
              <FadeInWhenVisible key={index}>
                <Product data={each} />
              </FadeInWhenVisible>
            ))}
          </div>
          {isShowClearFilter && (
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
