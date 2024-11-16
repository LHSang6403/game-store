"use client";

import Image from "next/image";
import FadeInWhenVisible from "@components/FadeInWhenVisible";

export default function MultiGames() {
  return (
    <>
      <div className="mt-20 flex flex-col items-center gap-4">
        <h1 className="text-center text-3xl font-bold xl:text-4xl">
          <span className="appearance-none bg-gradient-to-r from-cyelow to-cpink bg-clip-text text-transparent">
            Các trò chơi
          </span>
          <br></br>
          đa dạng
        </h1>
        <p className="text-center text-sm font-light">
          Dù bạn yêu thích thể loại hành động, phiêu lưu, chiến thuật hay thể
          thao, chúng tôi đều có những tựa game phù hợp với bạn. Các trò chơi
          nhập vai sẽ đưa bạn vào những câu chuyện sâu sắc và kỳ ảo, trong khi
          các game chiến thuật đòi hỏi sự tư duy và tính toán cẩn thận.
        </p>
      </div>
      <FadeInWhenVisible className="mx-auto w-fit">
        <div className="mt-10 grid h-full grid-cols-1 items-center gap-10 md:mt-20 md:grid-cols-2">
          <div className="flex h-full max-w-full flex-col items-start justify-center gap-6 pl-0 md:max-w-[500px] md:pl-10">
            <div>
              <Image
                src="/assets/images/home/controller.png"
                alt="Controller"
                width={50}
                height={50}
              />
            </div>
            <h2 className="text-4xl font-semibold">
              Đĩa game<br></br>
              <span className="appearance-none bg-gradient-to-r from-cpurple to-cpink bg-clip-text text-transparent">
                phong phú
              </span>
            </h2>
            <p className="text-sm">
              Đĩa chơi game là phụ kiện không thể thiếu cho bất kỳ game thủ nào,
              mang lại sự tiện lợi và linh hoạt trong việc truy cập và tận hưởng
              các tựa game yêu thích. Với các đĩa chơi game như PlayStation
              Network Card, Xbox Live Gift Card, bạn có thể dễ dàng nạp tiền vào
              tài khoản game của mình để mua trò chơi, nội dung tải về (DLC), và
              các dịch vụ trực tuyến khác.
            </p>
          </div>
          <div className="h-fit w-full overflow-hidden rounded-xl shadow-xl">
            <Image
              src="/assets/images/home/game-disk.jpg"
              alt="Logo"
              className="object-fit !relative h-[100%] md:max-w-[500px]"
              priority
              quality={100}
              fill
            />
          </div>
          <div className="h-fit w-full overflow-hidden rounded-xl shadow-xl">
            <Image
              src="/assets/images/home/game-disk-2.jpg"
              alt="Logo"
              className="object-fit !relative h-[100%] md:max-w-[500px]"
              priority
              quality={100}
              fill
            />
          </div>
          <div className="flex h-full max-w-full flex-col items-start justify-center gap-6 pl-0 md:max-w-[500px] md:pl-10">
            <div>
              <Image
                src="/assets/images/home/buttons.png"
                alt="Logo"
                width={50}
                height={50}
              />
            </div>
            <h2 className="text-4xl font-semibold">
              Đã dạng<br></br>{" "}
              <span className="appearance-none bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-transparent">
                các thể loại
              </span>
            </h2>
            <p className="text-sm">
              Ngoài việc cung cấp nhiều lựa chọn về mệnh giá, thẻ chơi game còn
              mang lại nhiều ưu đãi và khuyến mãi hấp dẫn từ các nhà phát hành.
              Sử dụng thẻ chơi game, bạn có thể hưởng lợi từ các đợt giảm giá,
              sự kiện đặc biệt và các gói nội dung độc quyền, giúp tối ưu hóa
              trải nghiệm chơi game của mình.
            </p>
          </div>
        </div>
      </FadeInWhenVisible>
    </>
  );
}
