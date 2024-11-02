import Image from "next/image";

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
      <div className="mt-24 flex w-full flex-col items-center xl:mt-10">
        <h1 className="text-center text-4xl font-bold text-foreground xl:text-3xl">
          <span className="appearance-none bg-gradient-to-r from-cpurple to-corange bg-clip-text text-transparent">
            Thương hiệu
          </span>{" "}
          <br className="xl:hidden"></br>
          nổi bật
        </h1>
        <p className="mt-4 text-center font-light sm:text-sm">
          Tại 2Win, chúng tôi cung cấp các phụ kiện chính hãng từ những thương
          hiệu uy tín nhất.<br className="xl:hidden"></br> Từ tay cầm, tai nghe,
          đế sạc, túi đựng máy chơi game đến các phụ kiện khác, tất cả đều đảm
          bảo chất lượng và độ bền cao.
        </p>
        <div className="mt-16 grid w-full grid-cols-6 gap-6 lg:grid-cols-3 sm:mt-10 sm:gap-4">
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
      </div>
    </>
  );
}
