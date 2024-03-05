"use client";

import { Slider } from "@/components/ui/slider";
import useDateSelect from "@/zustand/useDateSelect";

export default function RangeTimeSelect() {
  const { date, setYear } = useDateSelect();

  const startYear = 2021;
  const endYear = new Date().getFullYear();

  return (
    <div className="flex flex-row items-center gap-2">
      <h2 className="text-sm font-medium">Year: {date.year}</h2>
      <Slider
        className="w-[200px]"
        onValueChange={(value) => setYear(value[0])}
        defaultValue={[endYear]}
        min={startYear}
        max={endYear}
        step={1}
      />
    </div>
  );
}
