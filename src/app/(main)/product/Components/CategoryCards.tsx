import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { readAllCategories } from "@/app/_actions/product";

export default async function CategoryCards() {
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
      name: "Mini Game",
      link: "/category",
      image: "/assets/images/gameIcon/i1.png",
    },
    {
      name: "2 Players",
      link: "/category",
      image: "/assets/images/gameIcon/i1.png",
    },
  ];

  const response = await readAllCategories();
  if (response.error) throw new Error(response.error);

  return (
    <ul
      className="mx-auto flex h-fit max-w-[900px] flex-row overflow-x-auto pb-2 
    xl:mx-auto xl:w-[80%] sm:w-full"
    >
      {response?.data?.map((each, index: number) => (
        <li className="mx-2" key={index}>
          <CategoryCard data={each} />
        </li>
      ))}
    </ul>
  );
}

function CategoryCard({ data }: { data: { category: string } }) {
  return (
    <Badge
      variant="secondary"
      className="h-8 w-fit overflow-ellipsis hover:cursor-pointer hover:bg-foreground/10"
    >
      <div className="mb-1 mr-1 h-4 w-4">
        <Image
          alt="Category"
          src="/assets/images/gameIcon/i1.png"
          className="!relative !w-full object-contain"
          layout="fill"
        />
      </div>
      {data.category}
    </Badge>
  );
}
