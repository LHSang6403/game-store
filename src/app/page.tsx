import Header from "@components/Layout/Header/Header";
import Footer from "@components/Layout/Footer/Footer";
import Template from "@app/(main)/template";
import Image from "next/image";
import Link from "next/link";
import BestSeller from "@/components/HomeSections/BestSeller";
import Accessories from "@/components/HomeSections/Accessories";
import BestPrice from "@/components/HomeSections/BestPrice";
import MultiGames from "@/components/HomeSections/MultiGames";
import Brands from "@/components/HomeSections/Brands";

export default function page() {
  return (
    <>
      <Header />
      <Template>
        <main className="mx-auto flex h-auto min-h-0 w-full max-w-[1600px] flex-col items-center pb-10 pt-0 animate-in md:min-h-screen md:pb-20 md:pt-16">
          <div className="flex h-auto w-full flex-col items-center px-2 md:px-4 xl:px-10">
            <div className="relative w-full">
              <div className="absolute left-0 right-0 top-4 -z-20 flex w-full justify-center">
                <Image
                  src="/assets/images/home/dot-bg.png"
                  alt="Logo"
                  className="object-fit !relative h-[100%] max-w-[900px] opacity-50"
                  priority
                  quality={100}
                  fill
                />
              </div>
              <div className="absolute left-8 top-12 -z-10 flex h-fit w-fit justify-start pt-24 md:left-16 lg:left-24 xl:left-64">
                <Image
                  src="/assets/images/home/blue-blur-bg.png"
                  alt="Logo"
                  className="object-fit !relative -ml-4 h-[100%] max-h-[1000px] max-w-[1000px] opacity-90"
                  priority
                  quality={100}
                  fill
                />
              </div>
            </div>
            <div className="mt-12 flex flex-col items-center gap-4">
              <h1 className="text-center text-3xl font-bold md:text-4xl">
                Thiết bị{" "}
                <span className="bg-gradient-to-r from-cpurple via-cpink to-corange bg-clip-text text-transparent">
                  chơi game
                </span>{" "}
                <br className=""></br>
                <span className="appearance-none bg-gradient-to-r from-cpurple via-cpink to-corange bg-clip-text text-transparent">
                  chất lượng,{" "}
                </span>
                giá tốt nhất
              </h1>
              <Link
                href="/product"
                className="z-20 mt-3 h-fit rounded-full bg-foreground px-6 py-2 text-[15px] font-light text-background duration-200 ease-in-out hover:bg-foreground/90 md:mt-6"
              >
                Khám phá sản phẩm
              </Link>
            </div>
            <div className="z-10 mt-0 flex w-full justify-center md:-mt-8">
              <Image
                src="/assets/images/gamePlay/g10.png"
                alt="Play Station"
                className="object-fit !relative h-[100%] max-w-[900px]"
                priority
                quality={100}
                fill
              />
            </div>
            <BestSeller />
          </div>
          <Accessories />
          <div className="mt-6 flex h-auto w-full flex-col items-center px-4 md:px-6 xl:px-10">
            <BestPrice />
            <MultiGames />
            <Brands />
          </div>
        </main>
      </Template>
      <Footer />
    </>
  );
}
