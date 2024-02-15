import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function CategoryCards() {
  const categoryList = [
    {
      name: "Modern",
      link: "/category",
      image: "/assets/images/gameIcon/i1.png",
    },
    {
      name: "Classic",
      link: "/category",
      image: "/assets/images/gameIcon/i1.png",
    },
    {
      name: "Portable",
      link: "/category",
      image: "/assets/images/gameIcon/i1.png",
    },
    {
      name: "Console",
      link: "/category",
      image: "/assets/images/gameIcon/i1.png",
    },
    {
      name: "Accessories",
      link: "/category",
      image: "/assets/images/gameIcon/i1.png",
    },
  ];

  return (
    <div className="w-fit sm:w-full h-fit mx-auto flex flex-row gap-3 justify-items-center overflow-scroll">
      {categoryList.map((each, index: number) => (
        <CategoryCard key={index} data={each} />
      ))}
    </div>
  );
}

function CategoryCard({
  data,
}: {
  data: { name: string; link: string; image: string };
}) {
  return (
    <Badge
      variant="secondary"
      className="hover:cursor-pointer hover:bg-foreground/10"
    >
      <div className="w-4 h-4 mb-1 mr-1">
        <Image
          alt="Category"
          src={data.image}
          className="object-contain !w-full !relative"
          layout="fill"
        />
      </div>
      {data.name}
    </Badge>
  );
}
