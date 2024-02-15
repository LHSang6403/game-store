import Image from "next/image";
import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

export default function Advertisement() {
  return (
    <div className="w-full min-h-[70vh] max-h-[90vh] xl:h-screen relative bg-foreground">
      <h1 className="absolute top-16 sm:top-10 left-28 sm:left-8 max-w-80 sm:w-60 text-5xl sm:text-3xl font-bold text-background/90">
        This is Online Game Store: <span className="text-[#FD5E4F]">Nit</span>
        <span className="text-[#07BCDD]">endo</span>
      </h1>
      <div className="absolute z-0 bottom-16 xl:bottom-24 left-40 lg:left-12 sm:left-8 h-44 w-44 rounded-full grid grid-cols-10 gap-1 sm:opacity-60 bg-gradient-to-l from-[#07BCDD] to-hsl(222.2, 84%, 4%)"></div>
      <div className="absolute z-0 bottom-20 xl:bottom-28 left-44 lg:left-20 sm:left-12 h-48 w-48 rounded-full grid grid-cols-10 gap-1 opacity-70 sm:opacity-50 bg-gradient-to-r from-[#FD5E4F] to-hsl(222.2, 84%, 4%)"></div>
      <div className="absolute z-0 bottom-10 xl:bottom-20 left-48 lg:left-28 sm:left-16 h-44 w-44 rounded-full grid grid-cols-10 gap-1 opacity-60 sm:opacity-40 bg-gradient-to-b from-[#FFB718] to-hsl(222.2, 84%, 4%)"></div>
      <img
        src="/assets/images/gameIcon/i2.png"
        alt="Promotion"
        className="absolute bottom-28 xl:bottom-36 left-56 lg:left-32 sm:left-24 h-20 w-20 sm:opacity-80"
      ></img>
      <div className="h-[600px] xl:w-[90%] xl:h-[90%] sm:w-full sm:h-[75%] mx-auto">
        <Image
          alt="Category"
          src="/assets/images/gamePlay/g6.png"
          className="object-contain !w-full !relative hover:scale-[1.01] transition duration-300 ease-in-out"
          layout="fill"
        />
      </div>
      <div className="absolute bottom-20 xl:bottom-32 lg:bottom-24 sm:bottom-12 right-28 lg:right-2 sm:right-0 w-80 sm:w-72 h-fit px-2 text-background/90 hover:text-background">
        <h2 className="max-w-44 px-2 py-1 text-2xl font-semibold bg-[#07BCDD]">
          2024 Nitendo Switch OLED
        </h2>
        <p className="mt-2 overflow-ellipsis line-clamp-5">
          The Nintendo Switch is a versatile gaming console that offers both
          traditional console gaming experience and the flexibility of handheld
          gaming.
        </p>
        <Link href="/product" className="font-light">
          Explore
          <ChevronDoubleRightIcon className="w-5 h-5 inline-block" />
        </Link>
      </div>
    </div>
  );
}
