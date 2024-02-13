import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

export default function CollectionCards() {
  const collectionCards = [
    {
      title: "Xiaomi Mi 11 Ultra",
      image: "/assets/images/phones/p4.png",
    },
    {
      title: "Google Pixels",
      image: "/assets/images/phones/p2.png",
    },
  ];

  const descriptionCards = [
    {
      title: "Xiaomi Mi 11 Ultra",
      description:
        "The Xiaomi Mi 11 Ultra is a flagship smartphone that comes with a 6.81-inch AMOLED display. The phone has a triple camera setup on the back, which includes a 50MP primary sensor, a 48MP ultra-wide sensor, and a 48MP telephoto sensor. The device is powered by a Qualcomm Snapdragon 888 SoC, and it has a 5,000mAh battery with 67W fast charging support.",
    },
    {
      title: "Google Pixels",
      description:
        "The Google Pixel 4 XL is a flagship smartphone that comes with a 6.3-inch OLED display. The phone has a dual-camera setup on the back, which includes a 12.2MP primary sensor and a 16MP telephoto sensor. The device is powered by a Qualcomm Snapdragon 855 SoC, and it has a 3,700mAh battery with 18W fast charging support.",
    },
  ];

  return (
    <div className="w-full h-full z-10 grid grid-cols-2 gap-2 bg-none">
      <CollectionCard data={collectionCards[0]} />
      <DescriptionCard data={descriptionCards[0]} />
      <DescriptionCard data={descriptionCards[1]} />
      <CollectionCard data={collectionCards[1]} />
    </div>
  );
}

function CollectionCard({ data }: { data: { title: string; image: string } }) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-none">
      <img
        alt="Phone"
        src={data.image}
        className="w-[86%] mx-auto hover:scale-[1.01] hover:brightness-105 transition duration-300 ease-in-out"
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
    <div className="w-[80%] mx-auto h-full overflow-hidden p-4 bg-none">
      <div className="mt-4 flex flex-row gap-1 text-foreground/90 hover:text-foreground transition duration-300 ease-in-out">
        <Link href="/product" className="text-2xl font-medium">
          {data.title}
        </Link>
        <ChevronDoubleRightIcon className="w-7 h-7 mt-0.5" />
      </div>
      <p className="text-sm mt-4 text-foreground/90 hover:text-foreground hover:cursor-pointer transition duration-300 ease-in-out">
        {data.description}
      </p>
    </div>
  );
}
