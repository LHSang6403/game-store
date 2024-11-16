"use client";

import Link from "next/link";
import Image from "next/image";
import FadeInWhenVisible from "@components/FadeInWhenVisible";

export default function BestSeller() {
  return (
    <>
      <FadeInWhenVisible>
        <div className="mt-10 flex w-full flex-col items-start gap-4 px-2 md:px-4 xl:px-36">
          <Link
            href="/product"
            className="mb-2 h-fit rounded-full border border-[#E9DFFF] bg-white px-4 py-0.5 text-[15px] font-light text-cpurple hover:cursor-pointer"
          >
            Khám phá ngay
          </Link>
          <h1 className="text-3xl font-bold md:text-4xl">
            <span className="appearance-none bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-transparent">
              Sản phẩm
            </span>{" "}
            <br className="hidden md:block"></br> bán chạy
          </h1>
          <p className="text-sm font-light">
            Các sản phẩm bán chạy tại 2Win luôn là những thiết bị được game thủ
            ưa chuộng nhất, nổi bật với chất lượng vượt trội và tính năng đột
            phá. Những chiếc máy chơi game mới nhất từ PlayStation, Xbox và
            Nintendo luôn nằm trong top lựa chọn của khách hàng. Hãy đến với
            chúng tôi để khám phá những sản phẩm hot nhất và nâng cấp trải
            nghiệm chơi game của bạn!
          </p>
        </div>
      </FadeInWhenVisible>
      <FadeInWhenVisible>
        <div className="my-10 flex w-full flex-col gap-4 px-2 md:flex-row md:px-4 xl:px-36">
          <div className="w-full md:w-1/2">
            <div className="-mb-1 -ml-12">
              <Image
                src="/assets/images/gamePlay/g9.png"
                alt="Play Station 5"
                className="object-fit !relative h-[100%] max-w-[350px]"
                priority
                quality={100}
                fill
              />
            </div>
            <h2 className="text-3xl font-semibold">
              Sony <br></br>
              <Link href="#" className="flex flex-row hover:cursor-pointer">
                <span className="hover bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-transparent">
                  Play Station 5
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-chevron-right ml-1 text-cpurple"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </h2>
            <p className="mt-4 max-w-[450px] text-sm">
              PlayStation 5 (PS5) là đỉnh cao của công nghệ chơi game, mang đến
              trải nghiệm chơi game đột phá và hiệu suất vượt trội.
            </p>
            <p className="mt-2 max-w-[450px] text-sm">
              Với thiết kế hiện đại và mạnh mẽ, PS5 được trang bị bộ vi xử lý
              AMD Ryzen Zen 2 và GPU RDNA 2, hỗ trợ đồ họa 4K chân thực và tốc
              độ khung hình lên đến 120fps.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="-mb-1 -ml-4">
              <Image
                src="/assets/images/gamePlay/g12.png"
                alt="Play Station 4"
                className="object-fit !relative h-[100%] max-w-[350px]"
                priority
                quality={100}
                fill
              />
            </div>
            <h2 className="text-3xl font-semibold">
              Sony <br></br>
              <Link href="#" className="flex flex-row hover:cursor-pointer">
                <span className="hover bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-transparent">
                  Play Station 4
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-chevron-right ml-1 text-cpurple"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </h2>
            <p className="mt-4 max-w-[450px] text-sm">
              PlayStation 4 Slim (PS4 Slim) là phiên bản tinh gọn của dòng PS4,
              mang lại hiệu suất ổn định và thiết kế nhỏ gọn, tiết kiệm không
              gian.
            </p>
            <p className="mt-2 max-w-[450px] text-sm">
              Với bộ vi xử lý AMD Jaguar 8 nhân và GPU AMD GCN, PS4 Slim hỗ trợ
              đồ họa Full HD và hiệu suất chơi game mượt mà. Máy còn được trang
              bị ổ cứng dung lượng lớn, cho phép lưu trữ nhiều trò chơi và dữ
              liệu.
            </p>
          </div>
        </div>
      </FadeInWhenVisible>
    </>
  );
}
