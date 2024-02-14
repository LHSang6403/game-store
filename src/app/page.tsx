import Header from "@components/Layout/Header/Header";
import Footer from "@components/Layout/Footer/Footer";
import HomeSlider from "@components/Sliders/HomeSlider";
import Template from "@app/(main)/template";
import KeyCard from "@app/HomePageComponents/KeyCard";
import ClientCard from "@app/HomePageComponents/ClientCard";
import CollectionCards from "@app/HomePageComponents/CollectionCards";
import TypicalProducts from "@app/HomePageComponents/TypicalProducts";
import Promotions from "@app/HomePageComponents/Promotions";
import Link from "next/link";

export default async function Home() {
  const keyValues = [
    {
      title: "Variety",
      description:
        "At Store, we guarantee range of products from reputable brands at competitive prices.",
    },
    {
      title: "Professional",
      description:
        "With experienced and knowledgeable staff, Store prioritizes top-notch service.",
    },
    {
      title: "Competitive",
      description:
        "Store is offering quality at the most competitive prices on the market.",
    },
    {
      title: "Quality",
      description:
        "We prioritize product and service quality, ensuring items are genuine and new.",
    },
  ];

  const clientSays = [
    {
      name: "John Doe",
      image: "/assets/images/people/male.png",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
      rating: 4,
    },
    {
      name: "John Smith",
      image: "/assets/images/people/female.png",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
      rating: 5,
    },
  ];

  return (
    <>
      <Header />
      <Template>
        <main className="animate-in w-full min-h-screen">
          <section className="w-full h-[90vh] bg-background">
            <HomeSlider />
          </section>
          <section className="w-full h-screen bg-foreground text-background p-12 flex flex-col gap-20">
            <div>
              <h1 className="text-center text-3xl font-medium mb-10">
                Our 4 keys
              </h1>
              <div className="w-full flex flex-row gap-4 justify-around">
                {keyValues.map((key, index: number) => (
                  <KeyCard key={index} data={key} />
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-center text-3xl font-medium mb-10">
                Happy Clients Says
              </h1>
              <div className="flex flex-row gap-8 justify-center">
                {clientSays.map((client, index: number) => (
                  <ClientCard data={client} key={index} />
                ))}
              </div>
            </div>
          </section>
          <section className="w-full h-screen bg-background p-12 relative z-0">
            <CollectionCards />
            <div className="absolute w-full h-full -z-10 top-0 left-16 flex flex-row gap-4 items-end">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="w-32 h-[70%] rounded-t-xl transform -skew-x-[20deg] bg-gradient-to-b from-foreground/10 to-hsl(222.2, 84%, 4%)"></div>
              ))}
              <div className="absolute -right-16 w-[800px] h-full  transform -skew-x-[20deg] bg- bg-gradient-to-t from-accent to-hsl(222.2, 84%, 4%)"></div>
            </div>
            <h2 className="absolute -right-10 bottom-32 transform -rotate-90 font-light text-foreground/70 hover:text-foreground hover:cursor-pointer transition duration-300 ease-in-out">
              Phone & Accessories Store
            </h2>
          </section>
          <section className="w-full h-screen bg-foreground text-background p-12 flex flex-col gap-10">
            <h1 className="text-center text-3xl font-medium">
              Typical Products
            </h1>
            <TypicalProducts />
            <div className="text-center">
              <Link className="text-xl font-medium" href="/">
                Explore more products ...
              </Link>
            </div>
          </section>
          <section className="w-full h-screen bg-background text-foreground p-12 flex flex-col gap-10">
            <h1 className="text-center text-3xl font-medium">Promotions</h1>
            <Promotions />
          </section>
        </main>
      </Template>
      <Footer />
    </>
  );
}
