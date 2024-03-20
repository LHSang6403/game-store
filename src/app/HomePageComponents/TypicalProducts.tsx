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
    <div className="grid h-fit w-full grid-cols-4 gap-6 xl:grid-cols-2 sm:grid-cols-1">
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
    <div className="mx-auto h-fit w-full max-w-80 bg-background/5 p-4 text-background transition duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer">
      <div className="relative max-h-44 w-full overflow-hidden">
        <Image
          alt="Typical Product"
          src={data.image}
          className="!relative !w-full object-contain"
          layout="fill"
        />
        <div className="absolute -right-8 top-8 h-8 w-24 -rotate-90 transform bg-foreground p-1 text-center text-sm font-light opacity-75">
          Game store
        </div>
      </div>
      <h2 className="mt-4 line-clamp-1 overflow-ellipsis text-center text-lg font-semibold">
        {data.brand}
      </h2>
      <h2 className="line-clamp-2 overflow-ellipsis text-center text-lg font-semibold">
        {data.name}
      </h2>
      <hr className="mt-1 w-[60%] border-t border-t-background/20"></hr>
      <p className="line-clamp-4 overflow-ellipsis text-sm font-light">
        {data.description}
      </p>
      <Link
        href="/"
        className="mt-3 flex flex-row gap-0.5 text-sm font-medium text-background/80 hover:text-background"
      >
        <span>Learn more</span>
        <ChevronDoubleRightIcon className="mt-0.5 h-4 w-4 font-light" />
      </Link>
    </div>
  );
}
