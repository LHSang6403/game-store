import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../Shadcn/Select";

export default function Selects() {
  return (
    <div className="grid w-full grid-cols-6 justify-center gap-2 xl:flex-col">
      <div className="col-span-2 xl:col-span-3">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Vùng" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Vùng</SelectLabel>
              <SelectItem value="Vung1">Vùng 1</SelectItem>
              <SelectItem value="Vung2">Vùng 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 xl:col-span-3">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Tỉnh" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tỉnh</SelectLabel>
              <SelectItem value="TP.HCM">TP. Hồ Chí Minh</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 xl:col-span-6">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Quận" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Quận</SelectLabel>
              <SelectItem value="Quan1">Quận 1</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
