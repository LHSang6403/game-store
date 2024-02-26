import Header from "@components/Layout/Header/Header";
import Footer from "@components/Layout/Footer/Footer";
import HomeSlider from "@components/Sliders/HomeSlider";
import Template from "@app/(main)/template";
import CollectionCards from "@app/HomePageComponents/CollectionCards";
import TypicalProducts from "@app/HomePageComponents/TypicalProducts";
import Promotions from "@app/HomePageComponents/Promotions";
import KeyCards from "@/app/HomePageComponents/KeyCards";
import ClientCards from "@app/HomePageComponents/ClientCards";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <Header />
      <Template>
        <main className="min-h-screen w-full animate-in">
          <section className="h-[90vh] w-full bg-background sm:h-fit">
            <HomeSlider />
          </section>
          <section className="flex h-fit w-full flex-col gap-20 bg-foreground p-12 pb-20 text-background sm:gap-10 sm:px-5 sm:pb-16">
            <div className="h-fit w-full">
              <h1 className="mb-10 text-center text-3xl font-medium">
                Our 4 keys
              </h1>
              <KeyCards />
            </div>
            <div className="h-fit w-full">
              <h1 className="mb-10 text-center text-3xl font-medium">
                Happy Clients Says
              </h1>
              <ClientCards />
            </div>
          </section>
          <section className="relative z-0 h-screen w-full bg-background p-12 xl:h-fit xl:px-6 sm:px-5">
            <CollectionCards />
            <div className="absolute left-16 top-0 -z-10 flex h-full w-full flex-row items-end gap-4 xl:-left-44 xl:-top-24 sm:-top-40">
              {Array.from({ length: 4 }).map((_, index: number) => (
                <div
                  key={index}
                  className="to-hsl(222.2, 84%, 4%) h-[70%] w-32 -skew-x-[20deg] transform rounded-t-xl bg-gradient-to-b from-foreground/10"
                ></div>
              ))}
            </div>
            <div className="xlw-[500px] to-hsl(222.2, 84%, 4%) absolute -right-44 bottom-0 -z-10 h-full w-[800px] -skew-x-[20deg] transform bg-gradient-to-t from-accent xl:-right-[460px] sm:-right-[600px]"></div>
            <h2 className="absolute -right-10 bottom-32 -rotate-90 transform font-light text-foreground/70 transition duration-300 ease-in-out hover:cursor-pointer hover:text-foreground xl:-right-16">
              Phone & Accessories Store
            </h2>
          </section>
          <section className="flex h-fit w-full flex-col gap-10 bg-foreground p-12 text-background sm:px-5">
            <h1 className="text-center text-3xl font-medium">
              Typical Products
            </h1>
            <TypicalProducts />
            <div className="text-center">
              <Link
                className="text-xl font-medium text-background/90 hover:text-background"
                href="/"
              >
                Explore more products ...
              </Link>
            </div>
          </section>
          <section className="flex h-fit w-full flex-col gap-10 bg-background p-12 text-foreground sm:px-5">
            <h1 className="text-center text-3xl font-medium">Promotions</h1>
            <Promotions />
            <div className="-mt-2 text-center xl:m-0">
              <Link
                className="text-xl font-medium text-foreground/90 hover:text-foreground"
                href="/"
              >
                Explore sales ...
              </Link>
            </div>
          </section>
        </main>
      </Template>
      <Footer />
    </>
  );
}
