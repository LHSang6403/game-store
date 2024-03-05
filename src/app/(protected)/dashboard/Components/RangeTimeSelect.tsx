"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { useState } from "react";

export default function RangeTimeSelect() {
  const startYear = 2021;
  const endYear = new Date().getFullYear();
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const [selectedYear, setSelectedYear] = useState<string>(endYear.toString());

  return (
    <div className="">
      <Select
        defaultValue={endYear.toString()}
        onValueChange={(value) => setSelectedYear(value)}
      >
        <SelectTrigger className="h-9 w-[110px]">
          <SelectValue placeholder="Select a year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Year</SelectLabel>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
