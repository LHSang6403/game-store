"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import useProductFilter from "@/zustand/useProductFilter";
import { toast } from "sonner";

export default function CategoryCard({ data }: { data: string }) {
  const { setCategories } = useProductFilter();

  return (
    <Badge
      onClick={() => {
        setCategories([data]);
        toast.success(`${data} is selected.`);
      }}
      variant="secondary"
      className="h-8 w-fit overflow-ellipsis hover:cursor-pointer hover:bg-foreground/10"
    >
      <div className="mb-1 mr-1 h-4 w-4">
        <Image
          alt="Category"
          src="/assets/images/gameIcon/i1.png"
          width={20}
          height={20}
        />
      </div>
      {data}
    </Badge>
  );
}
