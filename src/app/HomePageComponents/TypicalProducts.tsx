import Image from "next/image";
import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

export default function TypicalProducts() {
  const typicalProducts = [
    {
      brand: "Brand 1",
      name: "This is Product 1",
      price: 100,
      image:
        "https://www.zdnet.com/a/img/resize/06119597d8fde27e3074dc3bb4a9ce0f1851280a/2023/04/24/4e586f53-afa2-452d-baf4-cc7c78c2c5fb/samsung-galaxy-a54-5g.jpg?auto=webp&fit=crop&height=900&width=1200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    },
    {
      brand: "Brand 2",
      name: "This is Product 2",
      price: 100,
      image:
        "https://www.zdnet.com/a/img/resize/06119597d8fde27e3074dc3bb4a9ce0f1851280a/2023/04/24/4e586f53-afa2-452d-baf4-cc7c78c2c5fb/samsung-galaxy-a54-5g.jpg?auto=webp&fit=crop&height=900&width=1200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    },
    {
      brand: "Brand 3",
      name: "This is Product 3",
      price: 100,
      image:
        "https://www.zdnet.com/a/img/resize/06119597d8fde27e3074dc3bb4a9ce0f1851280a/2023/04/24/4e586f53-afa2-452d-baf4-cc7c78c2c5fb/samsung-galaxy-a54-5g.jpg?auto=webp&fit=crop&height=900&width=1200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    },
    {
      brand: "Brand 4",
      name: "This is Product 4",
      price: 100,
      image:
        "https://www.zdnet.com/a/img/resize/06119597d8fde27e3074dc3bb4a9ce0f1851280a/2023/04/24/4e586f53-afa2-452d-baf4-cc7c78c2c5fb/samsung-galaxy-a54-5g.jpg?auto=webp&fit=crop&height=900&width=1200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
    },
  ];

  return (
    <div className="w-full h-fit flex flex-row gap-6">
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
    <div className="w-full h-[480px] bg-background/5 text-background p-4 hover:scale-[1.01] hover:cursor-pointer transition duration-300 ease-in-out">
      <div className="w-full max-h-44 overflow-hidden relative">
        <Image
          alt="Typical Product"
          src={data.image}
          className="object-contain !w-full !relative"
          layout="fill"
        />
        <div className="absolute opacity-75 top-8 -right-8 h-8 w-24 text-center p-1 text-sm font-light bg-foreground transform -rotate-90">
          Phones store
        </div>
      </div>
      <h2 className="text-center text-lg font-semibold mt-4">{data.brand}</h2>
      <h2 className="text-center text-lg font-semibold">{data.name}</h2>
      {/* <p className="font-light text-base mt-2">Price: {data.price}</p> */}
      <hr className="w-[60%] mt-1 border-t border-t-background/20"></hr>
      <p className="font-light text-sm">{data.description}</p>
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
