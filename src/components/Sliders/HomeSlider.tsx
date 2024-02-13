"use client";

import { Card, CardContent } from "@components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { ArrowRight } from "lucide-react";

export default function HomeSlider() {
  const sliderImages = [
    {
      name: "iPhone 15 Pro",
      src: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846357018",
      description:
        "Experience unparalleled smoothness with iPhone - blending exquisite design with powerful performance for an unmatched mobile experience.",
      click: () => console.log("Clicked"),
    },
    {
      name: "iPad 10th Gen",
      src: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-pink-wifi_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=95&.v=1670856074755",
      description:
        "Power and elegance converge in every iPad - combining advanced technology with premium design to create a unique and sophisticated experience.",
      click: () => console.log("Clicked"),
    },
    {
      name: "Samsung Galaxy S24",
      src: "https://images.samsung.com/ae/smartphones/galaxy-s24/images/galaxy-s24-highlights-color-carousel-global-mo.jpg?imbypass=true",
      description:
        "Elevate your mobile experience with Samsung - cutting-edge technology meets sleek design for unparalleled performance and style.",
      click: () => console.log("Clicked"),
    },
    {
      name: "Microsoft Surface 10th Gen",
      src: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW16Wkf?ver=ded8&q=90&m=6&h=705&w=1253&b=%23FFFFFFFF&f=jpg&o=f&p=140&aim=true",
      description:
        "Elevate your work experience with Surface series - seamlessly blending innovative technology with elegant design for performance.",
      click: () => console.log("Clicked"),
    },
  ];

  return (
    <Carousel className="max-w-[90vw] mx-auto">
      <CarouselPrevious className="xl:hidden ml-4" />
      <CarouselContent>
        {sliderImages.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="h-[86vh] border-none">
              <CardContent className="relative overflow-hidden">
                <img
                  alt="Slider"
                  className="w-full h-full object-fit object-center"
                  src={image.src}
                />
                <div className="absolute w-72 bottom-36 left-16">
                  <h1 className="text-3xl font-semibold -mb-2">{image.name}</h1>
                  <button className="hover:text-foreground/70">
                    View more
                    <ArrowRight className="inline ml-0.5" />
                  </button>
                  <p className="font-light mt-2">{image.description}</p>
                </div>
                <div className="absolute text-sm font-light text-foreground/80 left-[41%] top-6 flex flex-row gap-4">
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
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="xl:hidden mr-4" />
    </Carousel>
  );
}
