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
        className={`mt-6 h-[580px] w-full rounded-lg xl:h-[550px] sm:mt-12 sm:h-[300px] ${
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
            <div className="mx-auto flex w-[90%] items-center justify-center overflow-hidden p-4 sm:w-full sm:p-1">
              <Image
                src={
                  process.env.NEXT_PUBLIC_SUPABASE_URL +
                  "/storage/v1/object/public/public_files/" +
                  image
                }
                alt="Product"
                width={800}
                height={800}
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
          className="swiper-button-next mr-10 lg:mr-0"
          style={{
            color: theme === "light" ? "#0F172B53" : "#F8FAFC7C",
          }}
        ></div>
        <div
          className="swiper-button-prev ml-10 lg:ml-0"
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
          xl:w-[90%] lg:mb-6 sm:w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className={`m-1 w-32 rounded-lg border transition duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer xl:w-[96%] ${
                activeIndex === index
                  ? "border-foreground opacity-100"
                  : "border-foreground/20 opacity-70"
              }`}
            >
              <Image
                src={
                  process.env.NEXT_PUBLIC_SUPABASE_URL +
                  "/storage/v1/object/public/public_files/" +
                  image
                }
                width={400}
                height={400}
                alt="Product Thumbnail"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
