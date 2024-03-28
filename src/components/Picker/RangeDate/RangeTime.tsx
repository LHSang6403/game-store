"use client";

import { DateRangePicker } from "@/components/Picker/RangeDate/DateRangePicker";
import useDatePicker from "@/zustand/useDatePicker";

export default function RangeTime() {
  const { to, from, setFrom, setTo } = useDatePicker();

  return (
    <div className="w-auto">
      <DateRangePicker
        onUpdate={(values) => {
          setFrom(values.range.from);
          setTo(values.range.to);
        }}
        locale="en-GB"
        showCompare={false}
      />
    </div>
  );
}
