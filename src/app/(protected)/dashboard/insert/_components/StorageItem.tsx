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
        <span className="w-full text-sm md:w-[80%]">
          Địa chỉ: {storage.address}, {storage.ward}, {storage.district},{" "}
          {storage.province}
        </span>
      </div>
    </Card>
  );
}
