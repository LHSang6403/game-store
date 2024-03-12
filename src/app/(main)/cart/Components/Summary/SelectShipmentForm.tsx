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
          <SelectLabel>Services</SelectLabel>
          <SelectItem value="GHTK">GH Tiet Kiem</SelectItem>
          <SelectItem value="GHN">GH Nhanh</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
