import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function CollectionCards() {
  const collectionCards = [
    {
      title: "Sony Play Station 4",
      image: "/assets/images/gamePlay/g12.png",
    },
    {
      title: "Microsoft Xbox Series",
      image: "/assets/images/gamePlay/g14.png",
    },
  ];

  const descriptionCards = [
    {
      title: "Sony Play Station 4",
      description:
        "The Sony Play is a flagship game station that comes with a 6.81-inch AMOLED display. The phone has a triple camera setup on the back, which includes a 50MP primary sensor, a 48MP ultra-wide sensor, and a 48MP telephoto sensor. The device is powered by a Qualcomm Snapdragon 888 SoC, and it has a 5,000mAh battery with 67W fast charging support.",
    },
    {
      title: "Microsoft Xbox Series",
      description:
        "The Xbox is a flagship that comes with a 6.3-inch OLED display. The phone has a dual-camera setup on the back, which includes a 12.2MP primary sensor and a 16MP telephoto sensor. The device is powered by a Qualcomm Snapdragon 855 SoC, and it has a 3,700mAh battery with 18W fast charging support.",
    },
  ];

  return (
    <div className="z-10 grid h-full w-full grid-cols-2 bg-none xl:h-fit xl:py-10 sm:grid-cols-1">
      <CollectionCard data={collectionCards[0]} />
      <DescriptionCard data={descriptionCards[0]} />
      <DescriptionCard data={descriptionCards[1]} />
      <CollectionCard data={collectionCards[1]} />
    </div>
  );
}

function CollectionCard({ data }: { data: { title: string; image: string } }) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-none">
      <Image
        alt="Phone"
        src={data.image}
        width={500}
        height={500}
        className="transition duration-300 ease-in-out hover:scale-[1.01] hover:brightness-105 xl:w-full"
      />
    </div>
  );
}

function DescriptionCard({
  data,
}: {
  data: { title: string; description: string };
}) {
  return (
    <div className="mx-auto h-full w-[80%] overflow-hidden bg-none p-4 xl:h-fit xl:w-full sm:w-full">
      <div className="mt-4 flex flex-row gap-1 text-foreground/80 transition duration-300 ease-in-out hover:text-foreground">
        <Link
          href="/product"
          className="w-fit text-2xl font-medium hover:cursor-pointer"
        >
          {data.title}
        </Link>
        <ChevronDoubleRightIcon className="mt-0.5 h-7 w-7" />
      </div>
      <p className="line-clamp-7 mt-4 overflow-ellipsis text-sm text-foreground/90 transition duration-300 ease-in-out hover:text-foreground">
        {data.description}
      </p>
    </div>
  );
}
