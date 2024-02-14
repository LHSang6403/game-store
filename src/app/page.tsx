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
        <main className="animate-in w-full min-h-screen">
          <section className="w-full h-[90vh] bg-background">
            <HomeSlider />
          </section>
          <section className="w-full min-h-screen bg-foreground text-background p-12 sm:px-6 flex flex-col gap-20 sm:gap-10">
            <div className="w-full h-fit">
              <h1 className="text-center text-3xl font-medium mb-10">
                Our 4 keys
              </h1>
              <KeyCards />
            </div>
            <div className="w-full h-fit">
              <h1 className="text-center text-3xl font-medium mb-10">
                Happy Clients Says
              </h1>
              <ClientCards />
            </div>
          </section>
          <section className="w-full h-screen sm:h-fit bg-background p-12 xl:px-6 relative z-0">
            <CollectionCards />
            <div className="absolute w-full h-full -z-10 top-0 left-16 xl:-left-44 xl:-top-24 sm:-top-40 flex flex-row gap-4 items-end">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="w-32 h-[70%] rounded-t-xl transform -skew-x-[20deg] bg-gradient-to-b from-foreground/10 to-hsl(222.2, 84%, 4%)"></div>
              ))}
            </div>
            <div className="absolute -z-10 bottom-0 -right-44 xl:-right-[460px] sm:-right-[600px] w-[800px] xlw-[500px] h-full transform -skew-x-[20deg] bg-gradient-to-t from-accent to-hsl(222.2, 84%, 4%)"></div>
            <h2 className="absolute -right-10 bottom-32 xl:-right-16 transform -rotate-90 font-light text-foreground/70 hover:text-foreground hover:cursor-pointer transition duration-300 ease-in-out">
              Phone & Accessories Store
            </h2>
          </section>
          <section className="w-full h-screen xl:h-fit bg-foreground text-background p-12 sm:px-6 flex flex-col gap-10">
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
          <section className="w-full h-screen xl:h-fit bg-background text-foreground p-12 sm:px-6 flex flex-col gap-10">
            <h1 className="text-center text-3xl font-medium">Promotions</h1>
            <Promotions />
            <div className="text-center -mt-2 xl:m-0">
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
