import Image from "next/image";
import { Button } from "../../Shadcn/Button";

export default function EventSection() {
  return (
    <section className="flex flex-col items-center">
      <h1 className="mb-8 mt-4 bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-center text-3xl text-transparent sm:mb-4">
        SỰ KIỆN HELLO MAMA
      </h1>
      <div className="flex w-fit flex-row gap-4 sm:flex-col">
        <div className="w-[450px] xl:w-1/2 sm:w-full">
          <Image
            alt="Dia chi"
            src="/assets/images/HelloMama/tintuc/mungdaile.png"
            className="object-fit !relative h-full !w-full xl:object-cover"
            layout="fill"
            quality={100}
          />
        </div>
        <div className="flex w-[750px] flex-col justify-between xl:w-1/2 sm:w-full">
          <h2 className="text-2xl">
            BÃO SALE - SIÊU DEAL TỪ HELLO MAMA MỪNG ĐẠI LỄ 30/4-1/5
          </h2>
          <p className="line-clamp-5 overflow-ellipsis font-light text-[#9D9B9B] xl:line-clamp-5 sm:mt-2 sm:text-center">
            Nhân dịp kỷ niệm 30-4 và 1-5, Hệ thống cửa hàng Hello Mama tung
            chương trình siêu ưu đãi mừng đại lễ dành cho khách hàng khi mua sắm
            tại tất cả các cửa hàng đại lý của Hello Mama.
          </p>
          <Button
            className="group mr-4 mt-4 flex w-fit flex-row gap-1 px-8 sm:mx-auto"
            type="submit"
          >
            <span className="bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-lg font-light text-transparent group-hover:text-white">
              Đọc thêm
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
