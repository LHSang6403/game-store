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
              <SelectLabel></SelectLabel>
              <SelectItem value="Vung1">Vùng 1</SelectItem>
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
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
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
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
