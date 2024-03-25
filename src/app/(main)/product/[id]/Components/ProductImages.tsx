"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import { useState } from "react";
import { useTheme } from "next-themes";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

export default function ProductImages({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme } = useTheme();

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="z-30 h-fit">
      <Swiper
        loop={true}
        pagination={{
          type: "fraction",
        }}
        className={`h-[600px] w-full rounded-lg sm:h-[400px] ${
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
            <div className="mx-auto flex h-full w-[90%] items-center justify-center overflow-hidden p-4 sm:w-full sm:p-1">
              <Image
                src={
                  process.env.NEXT_PUBLIC_SUPABASE_URL +
                  "/storage/v1/object/public/public_files/" +
                  image
                }
                alt="Product"
                width={1000}
                height={1000}
                quality={100}
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
          style={{
            color: theme === "light" ? "#0F172B53" : "#F8FAFC7C",
          }}
        ></div>
        <div
          className="swiper-button-prev"
          style={{ color: theme === "light" ? "#0F172B53" : "#F8FAFC7C" }}
        ></div>
      </Swiper>
      <Swiper
        onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
        loop={false}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs flex h-fit w-[700px] flex-row items-center justify-center rounded-lg
         lg:mb-6 lg:w-[600px] sm:w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className={`${
                activeIndex === index
                  ? "border-foreground opacity-100"
                  : "border-foreground/20 opacity-70"
              } m-1 h-24 w-32 rounded-lg border transition duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer lg:h-16 lg:w-20 ssm:h-12 ssm:w-16`}
            >
              <Image
                src={
                  process.env.NEXT_PUBLIC_SUPABASE_URL +
                  "/storage/v1/object/public/public_files/" +
                  image
                }
                width={200}
                height={200}
                alt="Product Thumbnail"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
