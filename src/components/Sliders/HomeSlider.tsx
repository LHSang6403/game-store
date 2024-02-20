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
    <Carousel className="max-w-[86vw] xl:max-w-[100vw] mx-auto">
      <CarouselPrevious className="xl:ml-20 sm:ml-16 xl:z-10" />
      <CarouselContent>
        {sliderImages.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="h-full border-none sm:p-0">
              <CardContent className="w-[90%] h-[84vh] sm:w-full sm:p-0 mx-auto relative overflow-hidden">
                <div className="absolute w-full text-sm font-light text-foreground/80 top-6 flex flex-row justify-center gap-4">
                  <button className="hover:text-foreground transition duration-300 ease-in-out">
                    Explore
                  </button>
                  <button className="hover:text-foreground transition duration-300 ease-in-out">
                    Shop Now
                  </button>
                  <button className="hover:text-foreground transition duration-300 ease-in-out">
                    Services
                  </button>
                </div>
                <img
                  alt="Slider"
                  className="w-full h-full xl:h-[80%] sm:h-[50%] sm:mt-4 object-cover object-center"
                  src={image.src}
                />
                <div className="absolute w-72 sm:w-full sm:px-3 p-1 bottom-12 left-6 sm:bottom-16 sm:left-0">
                  <h1 className="text-3xl font-semibold -mb-2">{image.name}</h1>
                  <button className="text-foreground/70 hover:text-foreground mt-1">
                    View more
                    <ArrowRight className="inline ml-0.5" />
                  </button>
                  <p className="font-light mt-2 overflow-hidden overflow-ellipsis line-clamp-4">
                    {image.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="xl:mr-20 sm:mr-16 xl:z-10" />
    </Carousel>
  );
}
