"use client";

import { useState } from "react";
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

export default function FilterArea() {
  const [price, setPrice] = useState<number>(300000);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed left-0 sm:-left-6 top-[50%] border-none bg- rotate-90"
          variant="outline"
        >
          Filter
          <ChevronUpIcon className="h-4 w-4 ml-0.5" />
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
            <Select>
              <SelectTrigger className="w-[60%] h-9">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Brands</SelectLabel>
                  <SelectItem value="sony">Sony</SelectItem>
                  <SelectItem value="nitendo">Nitendo</SelectItem>
                  <SelectItem value="sup">Sup Games</SelectItem>
                  <SelectItem value="apple">Apple Arcade</SelectItem>
                  <SelectItem value="xbox">Xbox</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              Type
            </Label>
            <Select>
              <SelectTrigger className="w-[60%] h-9">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                  <SelectItem value="console">Console</SelectItem>
                  <SelectItem value="tv">TV Games</SelectItem>
                  <SelectItem value="portable">Portable</SelectItem>
                  <SelectItem value="station">Station</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Label htmlFor="name" className="text-left">
              Price {formatCurrency(price)} VND
            </Label>
            <Slider
              defaultValue={[price]}
              min={100000}
              max={1000000}
              step={1}
              onValueChange={(values) => {
                setPrice(values[0]);
              }}
            />
          </div>
        </div>
        <SheetFooter className="mt-8">
          <SheetClose asChild>
            <Button type="submit" className="text-background">
              Select
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
