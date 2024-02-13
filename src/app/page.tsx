import Header from "@components/Layout/Header/Header";
import Footer from "@components/Layout/Footer/Footer";
import HomeSlider from "@components/Sliders/HomeSlider";
import Template from "@app/(main)/template";
import Image from "next/image";

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
        <main className="animate-in w-screen min-h-screen">
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
          <section className="w-full h-screen bg-background grid grid-cols-2">
            luoi 4 o, 2 sp 2 mo ta cheo'
          </section>
          <section className="w-full h-screen bg-foreground">
            cac' sp noi bat; sale
          </section>
        </main>
      </Template>
      <Footer />
    </>
  );
}

function KeyCard({ data }: { data: { title: string; description: string } }) {
  return (
    <div className="group w-1/4 rounded-lg p-2 border border-background/10 hover:scale-[1.02] hover:cursor-pointer hover:bg-background/10 transition duration-300 ease-in-out">
      <hr className="w-[36%] border-accent/30 rounded"></hr>
      <div className="flex flex-row gap-1.5">
        <h2 className="text-6xl text-accent group-hover:text-background transition duration-300 ease-in-out">
          {data.title.charAt(0)}
        </h2>
        <div>
          <h2 className="text-2xl font-semibold text-accent/70 group-hover:text-background transition duration-300 ease-in-out">
            {data.title.slice(1)}
          </h2>
          <p className="text-sm text-accent/50 group-hover:text-background transition duration-300 ease-in-out">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ClientCard({
  data,
}: {
  data: { name: string; image: string; review: string; rating: number };
}) {
  return (
    <div className="w-[500px] h-fit group rounded-lg flex flex-row justify-center gap-4 hover:cursor-pointer">
      <div className="flex flex-col gap-1">
        <Image
          className="mx-auto -brightness-105 group-hover:brightness-105 transition duration-300 ease-in-out"
          src={data.image}
          alt={data.name}
          width={120}
          height={120}
        />
        <h2 className="text-2xl font-medium text-accent/90 group-hover:text-background transition duration-300 ease-in-out">
          {data.name}
        </h2>
      </div>
      <div className="mt-4 w-1/2 font-light text-sm text-accent/70 group-hover:text-background transition duration-300 ease-in-out">
        <p>{data.review}</p>
        <div className="mt-2 font-medium text-accent/80 group-hover:text-background transition duration-300 ease-in-out">
          <span>Rating: </span>
          <span>{data.rating}</span>
        </div>
      </div>
    </div>
  );
}
