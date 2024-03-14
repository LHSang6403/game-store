import Selects from "./Components/Selects";
import SearchList from "./Components/SearchList";
import Image from "next/image";

export default function page() {
  return (
    <div className="xl:max-w-screen flex h-auto max-w-[1440px] flex-col items-center pb-20 pt-10 sm:w-screen sm:px-3">
      <h1 className="mb-6 bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-3xl text-transparent">
        HỆ THỐNG ĐẠI LÝ
      </h1>
      <div className="flex w-[870px] justify-center xl:w-[600px] sm:w-full">
        <Selects />
      </div>
      <div className="mt-3 flex w-full flex-row justify-center gap-2 xl:w-full xl:flex-col sm:w-full">
        <div className="">
          <SearchList />
        </div>
        <div className="h-fit w-96 xl:w-full">
          <Image
            alt="Dai li"
            src="/assets/images/HelloMama/daili_ads_image.png"
            className="object-fit !relative z-0 h-full !w-full xl:object-cover"
            layout="fill"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
