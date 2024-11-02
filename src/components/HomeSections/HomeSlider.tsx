import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { readProducts } from "@/app/_actions/product";

export default async function HomeSlider() {
  const products = await readProducts({
    limit: 60,
    offset: 0,
  });

  return (
    <Carousel className="mx-auto h-fit max-w-[100vw] md:max-w-[86vw]">
      <CarouselPrevious className="z-10 ml-16 md:ml-20" />
      <CarouselContent>
        {products?.data?.slice(0, 5).map((prod, index) => (
          <CarouselItem key={index}>
            <Card className="h-full border-none sm:h-fit">
              <CardContent className="relative mx-auto h-[70vh] w-full overflow-hidden p-0 md:h-[84vh] md:w-[90%]">
                <div className="absolute top-0 flex w-full flex-row justify-center gap-4 text-sm font-light text-foreground/80">
                  <Link
                    href="/product"
                    className="transition duration-300 ease-in-out hover:text-foreground"
                  >
                    Khám phá
                  </Link>
                  <Link
                    href="/product"
                    className="transition duration-300 ease-in-out hover:text-foreground"
                  >
                    Mua ngay
                  </Link>
                  <Link
                    href="/about"
                    className="transition duration-300 ease-in-out hover:text-foreground"
                  >
                    Dịch vụ
                  </Link>
                </div>
                <Image
                  alt="Slider"
                  className="mt-4 h-fit w-full object-cover object-center md:mt-0 md:h-full md:w-full"
                  src={
                    process.env.NEXT_PUBLIC_SUPABASE_URL +
                    "/storage/v1/object/public/public_files/" +
                    prod.images[0]
                  }
                  quality={100}
                  width={960}
                  height={960}
                />
                <div className="absolute bottom-2 left-0 h-fit w-full p-3 px-3 md:bottom-2 md:left-6 md:w-72">
                  <h1 className="text-3xl font-semibold">{prod.name}</h1>
                  <Link
                    href="/product"
                    className="mt-1 text-foreground/70 hover:text-foreground"
                  >
                    Chi tiết
                    <ArrowRight className="ml-0.5 inline" />
                  </Link>
                  <p className="mt-2 line-clamp-4 overflow-hidden overflow-ellipsis pb-1 font-light md:pb-0">
                    {prod.description} edfg gdfh gfdh gfdh gfh gfdh fdgh dhd gh
                    dfgdfhgd ghfdh fgdh dfg h fh fdg gdh hgd hdgf hd h hg
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="z-10 mr-16 md:mr-20" />
    </Carousel>
  );
}
