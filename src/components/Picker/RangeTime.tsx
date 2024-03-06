"use client";

import { DateRangePicker } from "@components/Picker/DateRangePicker";
import useDatePicker from "@/zustand/useDatePicker";

export default function RangeTime() {
  const { to, from, setFrom, setTo } = useDatePicker();

  return (
    <div className="w-auto">
      <DateRangePicker
        onUpdate={(values) => {
          setFrom(values.range.from);
          setTo(values.range.to);

          console.log("From", from, "To", to);
        }}
        locale="en-GB"
        showCompare={false}
      />
    </div>
  );
}
