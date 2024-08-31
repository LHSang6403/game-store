"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import formatCurrency from "@/utils/functions/formatCurrency";
import { useQuery } from "@tanstack/react-query";
import { readProductBrands, readAllCategories } from "@/app/_actions/product";
import useProductFilter from "@/zustand/useProductFilter";

export default function FilterAreaV2() {
  const { brands, categories, endPrice, setPrice, setBrands, setCategories } =
    useProductFilter();

  const { data: brandsData, isLoading: isBrandsDataLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await readProductBrands(),
    staleTime: 60 * (60 * 1000),
  });

  const { data: categoriesData, isLoading: isCategoriesDataLoading } = useQuery(
    {
      queryKey: ["categories"],
      queryFn: async () => await readAllCategories(),
      staleTime: 60 * (60 * 1000),
    }
  );

  return (
    <div className="flex w-full flex-row justify-start gap-10 md:flex-col">
      <div className="flex w-52 flex-col gap-2 md:w-full">
        <Label htmlFor="name" className="text-left">
          Nhà SX
        </Label>
        <Select
          disabled={isBrandsDataLoading}
          onValueChange={(value) => {
            setBrands([value]);
          }}
          defaultValue={brands[0] ?? "All"}
        >
          <SelectTrigger className="w-fullß h-9">
            <SelectValue placeholder="Chọn" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Nhà SX</SelectLabel>
              <SelectItem value="All">Tất cả</SelectItem>
              {brandsData?.data?.map((each) => (
                <SelectItem value={each}>{each}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* <div className="flex w-full flex-col gap-2">
        <Label htmlFor="name" className="text-left">
          Thể loại
        </Label>
        <Select
          disabled={isCategoriesDataLoading}
          onValueChange={(value) => {
            setCategories([value]);
          }}
          defaultValue={categories[0] ?? "All"}
        >
          <SelectTrigger className="h-9 w-full">
            <SelectValue placeholder="Chọn" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Các loại</SelectLabel>
              <SelectItem value="All">Tất cả</SelectItem>
              {categoriesData?.data?.map((each, index: number) => (
                <SelectItem key={index} value={each}>
                  {each}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}
      <div className="flex w-72 flex-col gap-2 md:w-full">
        <Label htmlFor="name" className="text-left">
          Giá từ 0 đến {formatCurrency(endPrice)} VNĐ
        </Label>
        <Slider
          className="mt-3"
          defaultValue={[endPrice]}
          min={100000}
          max={50000000}
          step={1}
          onValueChange={(values) => {
            setPrice(0, values[0]);
          }}
        />
      </div>
    </div>
  );
}
