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

export default function ProductsContainer() {
  const productList: ProductType[] = [
    {
      id: "1",
      created_at: "2022-01-01",
      brand: "brand",
      name: "name",
      description: "description",
      images: ["/assets/images/gamePlay/g7.png"],
      price: 1,
      option: ["option"],
      rate: 1,
      sold_quantity: 1,
      description_id: "1",
      category: "category",
    },
    {
      id: "2",
      created_at: "2022-01-01",
      brand: "brand",
      name: "name",
      description: "description",
      images: ["/assets/images/gamePlay/g7.png"],
      price: 1,
      option: ["option"],
      rate: 1,
      sold_quantity: 1,
      description_id: "1",
      category: "category",
    },
    {
      id: "3",
      created_at: "2022-01-01",
      brand: "brand",
      name: "name",
      description: "description",
      images: ["/assets/images/gamePlay/g7.png"],
      price: 1,
      option: ["option"],
      rate: 1,
      sold_quantity: 1,
      description_id: "1",
      category: "category",
    },
    {
      id: "4",
      created_at: "2022-01-01",
      brand: "brand",
      name: "name",
      description: "description",
      images: ["/assets/images/gamePlay/g7.png"],
      price: 1,
      option: ["option"],
      rate: 1,
      sold_quantity: 1,
      description_id: "1",
      category: "category",
    },
    {
      id: "5",
      created_at: "2022-01-01",
      brand: "brand",
      name: "name",
      description: "description",
      images: ["/assets/images/gamePlay/g7.png"],
      price: 1,
      option: ["option"],
      rate: 1,
      sold_quantity: 1,
      description_id: "1",
      category: "category",
    },
    {
      id: "5",
      created_at: "2022-01-01",
      brand: "brand",
      name: "name",
      description: "description",
      images: ["/assets/images/gamePlay/g7.png"],
      price: 1,
      option: ["option"],
      rate: 1,
      sold_quantity: 1,
      description_id: "1",
      category: "category",
    },
    {
      id: "5",
      created_at: "2022-01-01",
      brand: "brand",
      name: "name",
      description: "description",
      images: ["/assets/images/gamePlay/g7.png"],
      price: 1,
      option: ["option"],
      rate: 1,
      sold_quantity: 1,
      description_id: "1",
      category: "category",
    },
    {
      id: "5",
      created_at: "2022-01-01",
      brand: "brand",
      name: "name",
      description: "description",
      images: ["/assets/images/gamePlay/g7.png"],
      price: 1,
      option: ["option"],
      rate: 1,
      sold_quantity: 1,
      description_id: "1",
      category: "category",
    },
    {
      id: "5",
      created_at: "2022-01-01",
      brand: "brand",
      name: "name",
      description: "description",
      images: ["/assets/images/gamePlay/g7.png"],
      price: 1,
      option: ["option"],
      rate: 1,
      sold_quantity: 1,
      description_id: "1",
      category: "category",
    },
    {
      id: "5",
      created_at: "2022-01-01",
      brand: "brand",
      name: "name",
      description: "description",
      images: ["/assets/images/gamePlay/g7.png"],
      price: 1,
      option: ["option"],
      rate: 1,
      sold_quantity: 1,
      description_id: "1",
      category: "category",
    },
  ];

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="w-fit h-fit grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-5 sm:gap-2 justify-items-center">
        {productList.map((each: ProductType, index: number) => (
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
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext className="h-9" href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
