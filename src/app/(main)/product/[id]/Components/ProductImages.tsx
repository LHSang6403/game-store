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
          xl:w-[76%] lg:mb-6 lg:w-[84%] sm:w-[94%]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className={`${
                activeIndex === index
                  ? "bg-gradient-to-r from-cpurple via-cpink to-corange p-[1px] opacity-100"
                  : "bg-gradient-to-r from-[#9633ed84] via-[#f22b9c88] to-[#fd7c3681] p-[1px] opacity-90"
              } m-1 w-32 rounded-[12px] border transition duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer xl:w-[96%]`}
            >
              <div className="rounded-[11px] bg-background">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
