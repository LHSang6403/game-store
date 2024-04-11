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
    <Carousel className="mx-auto max-w-[86vw] xl:max-w-[100vw]">
      <CarouselPrevious className="xl:z-10 xl:ml-20 sm:ml-16" />
      <CarouselContent>
        {products?.data?.slice(0, 5).map((prod, index) => (
          <CarouselItem key={index}>
            <Card className="h-full border-none sm:h-[600px]">
              <CardContent className="relative mx-auto h-[84vh] w-[90%] overflow-hidden xl:w-full xl:p-0">
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
                  className="h-full w-full object-cover object-center xl:h-fit xl:w-full sm:mt-4"
                  src={
                    process.env.NEXT_PUBLIC_SUPABASE_URL +
                    "/storage/v1/object/public/public_files/" +
                    prod.images[0]
                  }
                  quality={100}
                  width={960}
                  height={960}
                />
                <div className="absolute bottom-2 left-6 h-fit w-72 p-3 sm:bottom-40 sm:left-0 sm:w-full sm:px-3 ssm:bottom-20">
                  <h1 className="text-3xl font-semibold">{prod.name}</h1>
                  <Link
                    href="/product"
                    className="mt-1 text-foreground/70 hover:text-foreground"
                  >
                    Chi tiết
                    <ArrowRight className="ml-0.5 inline" />
                  </Link>
                  <p className="mt-2 line-clamp-4 overflow-hidden overflow-ellipsis font-light sm:pb-2">
                    {prod.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="xl:z-10 xl:mr-20 sm:mr-16" />
    </Carousel>
  );
}
