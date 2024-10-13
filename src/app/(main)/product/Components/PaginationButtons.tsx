"use client";

import { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";

export default function PaginationButtons({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}) {
  const handlePageChange = useCallback(
    (pageNumber: number) => {
      onPageChange(pageNumber);
    },
    [onPageChange]
  );

  const handlePreviousClick = useCallback(() => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }, [currentPage, handlePageChange]);

  const handleNextClick = useCallback(() => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, handlePageChange]);

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap justify-center">
        <PaginationItem>
          <PaginationPrevious
            className={`hover:bg- h-9 ${
              !isPreviousDisabled
                ? "hover:cursor-pointer"
                : "hover:cursor-not-allowed"
            }`}
            onClick={handlePreviousClick}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              className={`hover:bg- h-9 hover:cursor-pointer ${
                index + 1 === currentPage
                  ? "border border-cpurple font-bold"
                  : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={`hover:bg- mr-5 h-9 ${
              !isNextDisabled
                ? "hover:cursor-pointer"
                : "hover:cursor-not-allowed"
            }`}
            onClick={handleNextClick}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
