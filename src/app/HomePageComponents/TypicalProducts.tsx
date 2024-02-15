import Image from "next/image";
import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

export default function TypicalProducts() {
  const typicalProducts = [
    {
      brand: "Nitendo",
      name: "Future Switch",
      price: 100,
      image: "/assets/images/gamePlay/g1.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    },
    {
      brand: "Classic",
      name: "Game Boy Series",
      price: 100,
      image: "/assets/images/gamePlay/g3.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    },
    {
      brand: "Sup Gaming",
      name: "Play Handheld",
      price: 100,
      image: "/assets/images/gamePlay/g5.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    },
    {
      brand: "Nitendo",
      name: "2024 Switch",
      price: 100,
      image: "/assets/images/gameSetup/g3.png",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    },
  ];

  return (
    <div className="w-full h-fit grid grid-cols-4 xl:grid-cols-2 sm:grid-cols-1 gap-6">
      {typicalProducts.map((each, index: number) => (
        <TypicalProduct key={index} data={each} />
      ))}
    </div>
  );
}

function TypicalProduct({
  data,
}: {
  data: {
    brand: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}) {
  return (
    <div className="w-full max-w-80 mx-auto h-fit bg-background/5 text-background p-4 hover:scale-[1.02] hover:cursor-pointer transition duration-300 ease-in-out">
      <div className="w-full max-h-44 overflow-hidden relative">
        <Image
          alt="Typical Product"
          src={data.image}
          className="object-contain !w-full !relative"
          layout="fill"
        />
        <div className="absolute opacity-75 top-8 -right-8 h-8 w-24 text-center p-1 text-sm font-light bg-foreground transform -rotate-90">
          Game store
        </div>
      </div>
      <h2 className="text-center text-lg font-semibold mt-4 overflow-ellipsis line-clamp-1">
        {data.brand}
      </h2>
      <h2 className="text-center text-lg font-semibold overflow-ellipsis line-clamp-2">
        {data.name}
      </h2>
      <hr className="w-[60%] mt-1 border-t border-t-background/20"></hr>
      <p className="font-light text-sm overflow-ellipsis line-clamp-4">
        {data.description}
      </p>
      <Link
        href="/"
        className="mt-3 text-sm font-medium text-background/80 hover:text-background flex flex-row gap-0.5"
      >
        <span>Learn more</span>
        <ChevronDoubleRightIcon className="font-light w-4 h-4 mt-0.5" />
      </Link>
    </div>
  );
}
