import Header from "@components/Layout/Header/Header";
import Footer from "@components/Layout/Footer/Footer";
import Template from "@app/(main)/template";
import Image from "next/image";
import Link from "next/link";
import BestSeller from "@app/HomeSections/BestSeller";
import Accessories from "@app/HomeSections/Accessories";
import BestPrice from "@app/HomeSections/BestPrice";
import MultiGames from "@app/HomeSections/MultiGames";
import Brands from "@app/HomeSections/Brands";

export default function page() {
  return (
    <>
      <Header />
      <Template>
        <main className="mx-auto flex h-auto min-h-screen w-full max-w-[1600px] flex-col items-center pb-20 pt-16 animate-in xl:pt-0 sm:min-h-0 sm:pb-10">
          <div className="flex h-auto w-full flex-col items-center px-10 xl:px-4 sm:px-2">
            <div className="relative w-full">
              <div className="absolute left-0 right-0 top-4 -z-20 flex w-full justify-center">
                <Image
                  src="/assets/images/home/dot-bg.png"
                  alt="Logo"
                  width={900}
                  height={900}
                  className="opacity-50"
                />
              </div>
              <div className="absolute left-64 top-12 -z-10 flex h-fit w-fit justify-start pt-24 xl:left-24 lg:left-16 sm:left-8">
                <Image
                  src="/assets/images/home/blue-blur-bg.png"
                  alt="Logo"
                  width={1000}
                  height={1000}
                  className="-ml-4 opacity-90"
                />
              </div>
            </div>
            <div className="mt-12 flex flex-col items-center gap-4">
              <h1 className="text-center text-4xl font-bold xl:text-3xl">
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
                className="z-20 mt-6 h-fit rounded-full bg-foreground px-6 py-2 text-[15px] font-light text-background duration-200 ease-in-out hover:bg-foreground/90 sm:mt-3"
              >
                Khám phá sản phẩm
              </Link>
            </div>
            <div className="z-10 -mt-8 xl:mt-0">
              <Image
                src="/assets/images/gamePlay/g10.png"
                alt="Play Station"
                width={900}
                height={900}
                quality={100}
              />
            </div>
            <BestSeller />
          </div>
          <Accessories />
          <div className="mt-6 flex h-auto w-full flex-col items-center px-10 xl:px-6 sm:px-4">
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
