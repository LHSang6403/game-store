import Image from "next/image";

export default function MapSection() {
  return (
    <div className="relative sm:mx-3">
      <div className="absolute top-1/2 z-10 h-fit w-48 -translate-y-1/2 transform rounded-md bg-gradient-to-r from-[#CD9F2D] via-[#F7EF8A] to-[#EDC967] px-3 py-7 sm:static sm:left-auto sm:top-auto sm:mb-3 sm:w-full sm:translate-y-0 sm:py-3">
        <h3 className="bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-transparent">
          Địa chỉ
        </h3>
        <p className="line-clamp-4 overflow-ellipsis text-sm font-light text-[#1c1c1c]">
          Nguyễn Tất Thành, Phường Khai Quang, TP. Vĩnh Yên, Tỉnh Vĩnh Phúc
        </p>
        <h3 className="mt-2 bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-transparent">
          Liên hệ
        </h3>
        <div className="text-sm font-light text-[#]">
          <p className="line-clamp-1 overflow-ellipsis">1900 066 878</p>
          <p className="line-clamp-1 overflow-ellipsis">024 777 66878</p>
          <p className="line-clamp-2 overflow-ellipsis">
            hellomama379@gmail.com
          </p>
        </div>
      </div>
      <div className="ml-36 overflow-hidden rounded-md sm:ml-0">
        <div className="w-[700px] xl:w-80 sm:w-full">
          <Image
            alt="Dia chi"
            src="/assets/images/HelloMama/map.png"
            className="object-fit !relative h-full !w-full xl:object-cover"
            layout="fill"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
