import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Promotions() {
  const promotions = [
    {
      title: "20% OFF",
      time: "Tháng này!",
      image: "/assets/images/gameSetup/g3.png",
      description:
        "Đây là mô tả cho chương trình khuyến mãi. Nó có thể ngắn gọn.",
    },
    {
      title: "50% OFF",
      time: "Tháng tới!",
      image: "/assets/images/gameSetup/g2.png",

      description:
        "Đây là mô tả cho chương trình khuyến mãi. Nó có thể ngắn gọn.",
    },
  ];

  return (
    <div className="flex h-fit w-full flex-row items-start justify-center gap-2 xl:flex-col xl:gap-6">
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
    <div className="relative flex h-fit w-fit items-center justify-center">
      <div className="w-full opacity-85">
        <Image
          alt="Typical Product"
          src={data.image}
          width={700}
          height={600}
        />
      </div>
      <div className="absolute right-0 top-0 flex h-full w-full flex-col items-center justify-center">
        <div className="h-fit w-56 border border-background p-3 text-foreground transition duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer">
          <h2 className="w-28 bg-[#ef7440] px-2 text-2xl font-bold">Sale</h2>
          <div className="flex w-fit flex-row">
            <h2 className="line-clamp-1 w-32 overflow-ellipsis bg-foreground p-1 pt-0 text-2xl font-bold text-background">
              {data.title}
            </h2>
            <p className="-ml-2.5 line-clamp-2 w-20 overflow-ellipsis bg-foreground p-1 text-xl font-bold leading-6 text-background">
              {data.time}
            </p>
          </div>
          <p className="line-clamp-2 w-full overflow-ellipsis bg-background/10 p-1 text-sm font-medium text-foreground dark:text-foreground">
            {data.description}
          </p>
          <div className="ml-1 mt-1 flex flex-row gap-0.5">
            <Link className="text-sm font-light" href="/">
              Chi tiết
            </Link>
            <ArrowRightIcon className="mt-0.5 h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
