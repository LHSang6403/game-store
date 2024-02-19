"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

export default function ProductImages({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme, setTheme } = useTheme();

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="h-fit">
      <Swiper
        loop={true}
        pagination={{
          type: "fraction",
        }}
        className={` h-[600px] sm:h-[400px] w-full rounded-lg ${
          theme === "dark" ? "dark:text-foreground" : "text-foreground"
        }`}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        thumbs={{
          swiper: thumbsSwiper,
        }}
        onSlideChange={(swiper) => handleSlideChange(swiper)}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-[90%] sm:w-full h-full overflow-hidden mx-auto p-4 sm:p-1 flex items-center justify-center">
              <Image
                src={image}
                alt="Product"
                className="object-contain !w-full !relative"
                layout="fill"
              />
            </div>
          </SwiperSlide>
        ))}
        <div
          className={`swiper-pagination ${
            theme === "dark" ? "dark:text-foreground" : "text-foreground"
          }`}
        ></div>
        <div
          className="swiper-button-next"
          style={{ color: theme === "light" ? "#0F172B" : "#F8FAFC" }}
        ></div>
        <div
          className="swiper-button-prev"
          style={{ color: theme === "light" ? "#0F172B" : "#F8FAFC" }}
        ></div>
      </Swiper>
      <Swiper
        onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
        loop={false}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs h-fit w-[700px] sm:w-full rounded-lg flex flex-row justify-center items-center"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className={`${
                activeIndex === index
                  ? "opacity-100 border-foreground"
                  : "opacity-70"
              } h-24 w-32 sm:h-10 sm:w-12 m-1 rounded-lg border hover:cursor-pointer hover:scale-[1.02] transition duration-300 ease-in-out`}
            >
              <Image
                src={image}
                width={200}
                height={200}
                alt="Product Thumbnail"
                className="block h-full w-full object-fit"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
