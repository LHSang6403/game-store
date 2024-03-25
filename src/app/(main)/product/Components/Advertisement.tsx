import Image from "next/image";
import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

export default function Advertisement() {
  return (
    <div className="relative max-h-[90vh] min-h-[70vh] w-full bg-foreground dark:bg-background xl:h-screen">
      <h1 className="absolute left-28 top-16 max-w-80 text-5xl font-bold text-background/90 dark:text-foreground sm:left-8 sm:top-10 sm:w-60 sm:text-3xl">
        This is Online Game Store: <span className="text-[#FD5E4F]">Nit</span>
        <span className="text-[#07BCDD]">endo</span>
      </h1>
      <div className="to-hsl(222.2, 84%, 4%) absolute bottom-16 left-40 z-0 grid h-44 w-44 grid-cols-10 gap-1 rounded-full bg-gradient-to-l from-[#07BCDD] xl:bottom-24 lg:left-12 sm:left-8 sm:opacity-60"></div>
      <div className="to-hsl(222.2, 84%, 4%) absolute bottom-20 left-44 z-0 grid h-48 w-48 grid-cols-10 gap-1 rounded-full bg-gradient-to-r from-[#FD5E4F] opacity-70 xl:bottom-28 lg:left-20 sm:left-12 sm:opacity-50"></div>
      <div className="to-hsl(222.2, 84%, 4%) absolute bottom-10 left-48 z-0 grid h-44 w-44 grid-cols-10 gap-1 rounded-full bg-gradient-to-b from-[#FFB718] opacity-60 xl:bottom-20 lg:left-28 sm:left-16 sm:opacity-40"></div>
      <img
        src="/assets/images/gameIcon/i2.png"
        alt="Promotion"
        className="absolute bottom-28 left-56 h-20 w-20 xl:bottom-36 lg:left-32 sm:left-24 sm:opacity-80"
      ></img>
      <div className="mx-auto h-fit xl:flex xl:h-[90%] xl:w-[90%] xl:items-center sm:h-[75%] sm:w-full">
        <Image
          alt="Category"
          src="/assets/images/gamePlay/g6.png"
          className="mx-auto transition duration-300 ease-in-out hover:scale-[1.01]"
          width={960}
          height={960}
        />
      </div>
      <div className="absolute bottom-20 right-28 h-fit w-80 px-2 text-background/90 hover:text-background xl:bottom-32 lg:bottom-24 lg:right-2 sm:bottom-12 sm:right-0 sm:w-72">
        <h2 className="max-w-44 bg-[#07BCDD] px-2 py-1 text-2xl font-semibold">
          2024 Nitendo Switch OLED
        </h2>
        <p className="mt-2 line-clamp-5 overflow-ellipsis dark:text-foreground">
          The Nintendo Switch is a versatile gaming console that offers both
          traditional console gaming experience and the flexibility of handheld
          gaming.
        </p>
        <Link href="/product" className="font-light">
          Explore
          <ChevronDoubleRightIcon className="inline-block h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
