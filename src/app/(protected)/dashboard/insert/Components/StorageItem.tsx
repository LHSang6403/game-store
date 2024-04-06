import { Card } from "@components/ui/card";
import { StorageType } from "@/utils/types";

export default function StorageItem({
  storage,
  isSelected,
}: {
  storage: StorageType;
  isSelected: boolean;
}) {
  return (
    <Card
      className={`${
        isSelected ? "bg-accent" : ""
      } flex h-20 w-full flex-row justify-between px-2 py-1 hover:cursor-pointer`}
    >
      <div className="flex w-full flex-col justify-between gap-1">
        <span className="font-medium">{storage.name}</span>
        <span className="w-[80%] text-sm xl:w-full">
          Địa chỉ: {storage.address}, {storage.ward}, {storage.district},{" "}
          {storage.province}
        </span>
      </div>
    </Card>
  );
}
