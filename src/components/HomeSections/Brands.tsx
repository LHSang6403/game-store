"use client";

import Image from "next/image";
import FadeInWhenVisible from "@components/FadeInWhenVisible";

export default function Brands() {
  const logos = [
    { name: "Play Station", url: "/assets/images/home/logos/1.png" },
    { name: "Nitendo Switch", url: "/assets/images/home/logos/2.png" },
    { name: "XBox", url: "/assets/images/home/logos/3.png" },
    { name: "Data Frog", url: "/assets/images/home/logos/4.png" },
    { name: "Zelda", url: "/assets/images/home/logos/5.png" },
    { name: "Dobe", url: "/assets/images/home/logos/6.png" },
  ];

  return (
    <>
      <div className="mt-10 flex w-full flex-col items-center md:mt-24">
        <h1 className="text-center text-3xl font-bold text-foreground md:text-4xl">
          <span className="appearance-none bg-gradient-to-r from-cpurple to-corange bg-clip-text text-transparent">
            Thương hiệu
          </span>{" "}
          <br className="hidden md:block"></br>
          nổi bật
        </h1>
        <p className="mt-4 text-center text-sm font-light">
          Tại 2Win, chúng tôi cung cấp các phụ kiện chính hãng từ những thương
          hiệu uy tín nhất.<br className="hidden md:block"></br> Từ tay cầm, tai
          nghe, đế sạc, túi đựng máy chơi game đến các phụ kiện khác, tất cả đều
          đảm bảo chất lượng và độ bền cao.
        </p>
        <FadeInWhenVisible>
          <div className="mt-10 grid w-full grid-cols-3 gap-4 md:mt-16 md:grid-cols-6 md:gap-6">
            {logos.map((img, index) => (
              <div
                className="transition duration-300 hover:scale-[1.02]"
                key={index}
              >
                <Image
                  src={img.url}
                  alt={img.name}
                  className="object-fit !relative h-[100%] max-w-[220px]"
                  priority
                  quality={100}
                  fill
                />
              </div>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </>
  );
}
