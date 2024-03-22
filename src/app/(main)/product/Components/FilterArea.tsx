"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { Slider } from "@/components/ui/slider";
import formatCurrency from "@/utils/functions/formatCurrency";
import { useQuery } from "@tanstack/react-query";
import { readProductBrands, readAllCategories } from "@/app/_actions/product";
import useProductFilter from "@/zustand/useProductFilter";
import { toast } from "sonner";

export default function FilterArea() {
  const {
    brands,
    categories,
    startPrice,
    endPrice,
    setPrice,
    setBrands,
    setCategories,
  } = useProductFilter();

  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await readProductBrands(),
    staleTime: 1000 * 60 * 60,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await readAllCategories(),
    staleTime: 1000 * 60 * 60,
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="bg- fixed left-0 top-[50%] rotate-90 border-none sm:-left-6"
          variant="outline"
        >
          Filter
          <ChevronUpIcon className="ml-0.5 h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Select your interests</SheetTitle>
          <SheetDescription>
            To make your experience better, we need to know what you like.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          <div className="mt-4 flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              Brand
            </Label>
            <Select
              onValueChange={(value) => {
                setBrands([value]);
              }}
              defaultValue={brands[0] ?? "All"}
            >
              <SelectTrigger className="h-9 w-[60%]">
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Brands</SelectLabel>
                  <SelectItem value="All">All</SelectItem>
                  {brandsData?.data?.map((each) => (
                    <SelectItem value={each}>{each}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              Category
            </Label>
            <Select
              onValueChange={(value) => {
                setCategories([value]);
              }}
              defaultValue={categories[0] ?? "All"}
            >
              <SelectTrigger className="h-9 w-[60%]">
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="All">All</SelectItem>
                  {categoriesData?.data?.map((each, index: number) => (
                    <SelectItem key={index} value={each}>
                      {each}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              Price from 0 to {formatCurrency(endPrice)} VND
            </Label>
            <Slider
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
        <SheetFooter className="mt-8">
          <SheetClose asChild>
            <Button
              onClick={() => {
                toast.success("Filter is applied.");
              }}
              type="submit"
              className="text-background"
            >
              Select
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
