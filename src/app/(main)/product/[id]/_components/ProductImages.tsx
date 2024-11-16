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
        className={`mt-12 h-[300px] w-full rounded-lg md:mt-6 md:h-[550px] xl:h-[580px] ${
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
            <div className="mx-auto flex w-full items-center justify-center overflow-hidden p-1 md:w-[90%] md:p-4">
              <Image
                src={
                  process.env.NEXT_PUBLIC_SUPABASE_URL +
                  "/storage/v1/object/public/public_files/" +
                  image
                }
                alt="Product"
                className="object-fit !relative h-auto max-w-[400px] md:max-h-[700px] md:max-w-[700px]"
                priority
                quality={100}
                fill
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
          className="swiper-button-next mr-0 md:mr-10"
          style={{
            color: theme === "light" ? "#0F172B53" : "#F8FAFC7C",
          }}
        ></div>
        <div
          className="swiper-button-prev ml-0 md:ml-10"
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
        className="thumbs mb-6 flex h-fit w-full flex-row items-center justify-center
          rounded-lg md:w-[76%] lg:w-[700px] xl:w-[94%]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className={`${
                activeIndex === index
                  ? "bg-gradient-to-r from-cpurple via-cpink to-corange p-[1px] opacity-100"
                  : "bg-gradient-to-r from-[#9633ed84] via-[#f22b9c88] to-[#fd7c3681] p-[1px] opacity-70"
              } m-1 w-auto rounded-[12px] transition duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer md:max-w-52`}
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
