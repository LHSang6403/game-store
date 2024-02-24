"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";

export default function HomeSlider() {
  const sliderImages = [
    {
      name: "Sony Play Station",
      src: "/assets/images/gamePlay/g8.png",
      description:
        "Experience unparalleled smoothness - blending exquisite design with powerful performance for an unmatched mobile experience.",
      click: () => console.log("Clicked"),
    },
    {
      name: "Play Station 5",
      src: "/assets/images/gamePlay/g10.png",
      description:
        "Power and elegance converge - combining advanced technology with premium design to create a unique and sophisticated experience.",
      click: () => console.log("Clicked"),
    },
    {
      name: "Classic Nitendo Switch",
      src: "/assets/images/gamePlay/g14.png",
      description:
        "Elevate your mobile experience with Nitendo - cutting-edge technology meets sleek design for unparalleled performance and style.",
      click: () => console.log("Clicked"),
    },
    {
      name: "Round Device Game",
      src: "/assets/images/gamePlay/g19.png",
      description:
        "Elevate your work experience with Classic series - seamlessly blending innovative technology with elegant design for performance.",
      click: () => console.log("Clicked"),
    },
  ];

  return (
    <Carousel className="mx-auto max-w-[86vw] xl:max-w-[100vw]">
      <CarouselPrevious className="xl:z-10 xl:ml-20 sm:ml-16" />
      <CarouselContent>
        {sliderImages.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="h-full border-none sm:p-0">
              <CardContent className="relative mx-auto h-[84vh] w-[90%] overflow-hidden sm:w-full sm:p-0">
                <div className="absolute top-6 flex w-full flex-row justify-center gap-4 text-sm font-light text-foreground/80">
                  <button className="transition duration-300 ease-in-out hover:text-foreground">
                    Explore
                  </button>
                  <button className="transition duration-300 ease-in-out hover:text-foreground">
                    Shop Now
                  </button>
                  <button className="transition duration-300 ease-in-out hover:text-foreground">
                    Services
                  </button>
                </div>
                <img
                  alt="Slider"
                  className="h-full w-full object-cover object-center xl:h-[80%] sm:mt-4 sm:h-[50%]"
                  src={image.src}
                />
                <div className="absolute bottom-12 left-6 w-72 p-1 sm:bottom-16 sm:left-0 sm:w-full sm:px-3">
                  <h1 className="-mb-2 text-3xl font-semibold">{image.name}</h1>
                  <button className="mt-1 text-foreground/70 hover:text-foreground">
                    View more
                    <ArrowRight className="ml-0.5 inline" />
                  </button>
                  <p className="mt-2 line-clamp-4 overflow-hidden overflow-ellipsis font-light">
                    {image.description}
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
