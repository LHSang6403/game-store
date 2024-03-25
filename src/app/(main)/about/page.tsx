import Timeline from "./Components/Timeline";
import Image from "next/image";
import Improvement from "./Components/Improvement";
import TheStore from "./Components/TheStore";

export const metadata = {
  title: "About | Next.js Kit",
  description: "The fastest way to build apps with Next.js and Supabase.",
  keywords: "next.js, supabase, starter kit",
};

export default function About() {
  return (
    <div className="flex flex-col gap-10">
      <section className="relative mx-auto w-full xl:h-[550px] sm:h-[400px] ssm:h-[300px]">
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center text-3xl font-semibold text-[#FFFFFF]">
          Game Store Setup
        </div>
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center pt-16 text-lg text-[#FFFFFF]">
          Best store in the world
        </div>
        <Image
          alt="Category"
          src="/assets/images/gameSetup/g6.png"
          className="object-fit brightness-60 !relative z-0 h-full !w-full rounded-2xl xl:object-cover"
          width={1920}
          height={1080}
          quality={100}
        />
      </section>
      <h1 className="text-center text-3xl font-semibold">The store</h1>
      <TheStore />
      <h1 className="text-center text-3xl font-semibold">Improvement</h1>
      <Improvement />
      <h1 className="text-center text-3xl font-semibold">Our journey</h1>
      <section className="h-fit bg-foreground py-6 sm:py-0">
        <Timeline />
      </section>
    </div>
  );
}
