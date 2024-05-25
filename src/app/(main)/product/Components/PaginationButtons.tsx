"use client";

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
  function handlePageChange(pageNumber: number) {
    onPageChange(pageNumber);
  }

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`hover:bg- h-9 ${
              !isPreviousDisabled
                ? "hover:cursor-pointer"
                : "hover:cursor-not-allowed"
            }`}
            onClick={() => {
              if (!isPreviousDisabled) handlePageChange(currentPage - 1);
            }}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              className={`hover:bg- h-9 hover:cursor-pointer ${
                index + 1 === currentPage
                  ? "border border-[#9733ED] font-bold"
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
            onClick={() => {
              if (!isNextDisabled) handlePageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
