"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectShipmentForm({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <Select defaultValue="GHTK" onValueChange={(value) => onChange(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select shipment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Dịch vụ</SelectLabel>
          <SelectItem value="GHTK">GH Tiết kiệm</SelectItem>
          <SelectItem value="GHN">GH Nhanh</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
