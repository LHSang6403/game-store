import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Promotions() {
  const promotions = [
    {
      title: "20% OFF",
      time: "This month!",
      image: "/assets/images/promotions/pro2.png",
      description: "This is a description for the promotion. It can be short.",
    },
    {
      title: "50% OFF",
      time: "Next month!",
      image: "/assets/images/promotions/pro1.png",

      description: "This is a description for the promotion. It can be short.",
    },
  ];

  return (
    <div className="w-full h-full flex flex-row justify-center items-start gap-2">
      {promotions.map((each, index: number) => (
        <Promotion key={index} data={each} />
      ))}
    </div>
  );
}

function Promotion({
  data,
}: {
  data: { title: string; time: string; image: string; description: string };
}) {
  return (
    <div className="relative w-full h-fit flex justify-center items-center">
      <div className="w-full opacity-85">
        <Image
          alt="Typical Product"
          src={data.image}
          className="object-contain !w-full !relative"
          layout="fill"
        />
      </div>
      <div className="absolute top-0 right-0 w-full h-full flex flex-col justify-center items-center">
        <div className="w-56 h-fit p-3 border border-background text-foreground hover:cursor-pointer">
          <h2 className="w-28 px-2 text-2xl font-bold bg-[#ef7440]">Sale</h2>
          <div className="w-fit flex flex-row">
            <h2 className="w-32 p-1 text-2xl font-bold bg-foreground text-background">
              {data.title}
            </h2>
            <p className="w-20 p-1 text-xl -ml-2.5 leading-5 font-bold bg-foreground text-background">
              {data.time}
            </p>
          </div>
          <p className="w-full p-1 text-sm font-medium bg-background/10 text-foreground dark:text-foreground">
            {data.description}
          </p>
          <div className="mt-1 ml-1 flex flex-row gap-0.5">
            <Link className="font-light text-sm" href="/">
              View detail
            </Link>
            <ArrowRightIcon className="h-4 w-4 mt-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
