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
        "Future Switch của Nitendo là một lựa chọn tuyệt vời cho những người đam mê trò chơi. Với thiết kế hiện đại và công nghệ tiên tiến, sản phẩm này mang đến trải nghiệm chơi game đỉnh cao và thú vị.",
    },
    {
      brand: "Classic",
      name: "Game Boy Series",
      price: 100,
      image: "/assets/images/gamePlay/g3.png",
      description:
        "Game Boy Series của Classic là dòng sản phẩm được nhiều người yêu thích trong cộng đồng game thủ. Với sự kết hợp hoàn hảo giữa thiết kế cổ điển và hiệu suất mạnh mẽ, đây là lựa chọn tốt cho mọi người muốn tận hưởng những trải nghiệm game retro.",
    },
    {
      brand: "Sup Gaming",
      name: "Play Handheld",
      price: 100,
      image: "/assets/images/gamePlay/g5.png",
      description:
        "Play Handheld của Sup Gaming là một thiết bị chơi game cầm tay linh hoạt và tiện lợi. Với màn hình rộng và khả năng chơi nhiều trò chơi khác nhau, sản phẩm này phù hợp cho cả người chơi mới và các game thủ kỳ cựu.",
    },
    {
      brand: "Nitendo",
      name: "2024 Switch",
      price: 100,
      image: "/assets/images/gameSetup/g3.png",
      description:
        "2024 Switch của Nitendo là một bước tiến mới trong công nghệ chơi game. Với tính năng và hiệu suất cải tiến, sản phẩm này mang lại trải nghiệm chơi game đỉnh cao và không thể bỏ qua cho mọi người yêu thích trò chơi.",
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
    <div className="mx-auto h-fit w-full bg-background/5 p-4 text-background transition duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer">
      <div className="relative w-full overflow-hidden">
        <Image
          alt="Typical Product"
          src={data.image}
          width={500}
          height={400}
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
      <hr className="mb-1 mt-3 w-[60%] border-t border-t-background/20"></hr>
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
