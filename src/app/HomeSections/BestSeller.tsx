import Link from "next/link";
import Image from "next/image";

export default function BestSeller() {
  return (
    <>
      <div className="flex w-full flex-col items-start gap-4 px-36 xl:px-4 sm:px-2">
        <Link
          href="/product"
          className="mb-2 h-fit rounded-full border border-[#E9DFFF] bg-white px-4 py-0.5 text-[15px] font-light text-[#7F4AFD] hover:cursor-pointer"
        >
          Khám phá ngay
        </Link>
        <h1 className="text-4xl font-bold xl:text-3xl">
          <span className="appearance-none bg-gradient-to-r from-[#02A9FF] to-[#8537F8] bg-clip-text text-transparent">
            Sản phẩm
          </span>{" "}
          <br className="xl:hidden"></br> bán chạy
        </h1>
        <p className="font-light sm:text-sm">
          Các sản phẩm bán chạy tại 2Win luôn là những thiết bị được game thủ ưa
          chuộng nhất, nổi bật với chất lượng vượt trội và tính năng đột phá.
          Những chiếc máy chơi game mới nhất từ PlayStation, Xbox và Nintendo
          luôn nằm trong top lựa chọn của khách hàng. Hãy đến với chúng tôi để
          khám phá những sản phẩm hot nhất và nâng cấp trải nghiệm chơi game của
          bạn!
        </p>
      </div>
      <div className="my-10 flex w-full flex-row px-36 xl:px-4 lg:flex-col sm:px-2">
        <div className="w-1/2 lg:w-full">
          <div className="-mb-1 -ml-12">
            <Image
              src="/assets/images/gamePlay/g9.png"
              alt="Play Station 5"
              width={350}
              height={350}
            />
          </div>
          <h2 className="text-3xl font-semibold">
            Sony <br></br>
            <span className="group flex flex-row hover:cursor-pointer">
              <span className="hover bg-gradient-to-r from-[#02A9FF] to-[#8538F8] bg-clip-text text-transparent group-hover:from-[#02abffee] group-hover:to-[#8538f8ee]">
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
                className="lucide lucide-chevron-right ml-1 text-[#8538F8] group-hover:text-[#8538f8ee]"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </h2>
          <p className="mt-4 max-w-[450px] text-sm">
            PlayStation 5 (PS5) là đỉnh cao của công nghệ chơi game, mang đến
            trải nghiệm chơi game đột phá và hiệu suất vượt trội.
          </p>
          <p className="mt-2 max-w-[450px] text-sm">
            Với thiết kế hiện đại và mạnh mẽ, PS5 được trang bị bộ vi xử lý AMD
            Ryzen Zen 2 và GPU RDNA 2, hỗ trợ đồ họa 4K chân thực và tốc độ
            khung hình lên đến 120fps.
          </p>
        </div>
        <div className="w-1/2 lg:w-full">
          <div className="-mb-1 -ml-4">
            <Image
              src="/assets/images/gamePlay/g12.png"
              alt="Play Station 4"
              width={350}
              height={350}
            />
          </div>
          <h2 className="text-3xl font-semibold">
            Sony <br></br>
            <span className="group flex flex-row hover:cursor-pointer">
              <span className="hover bg-gradient-to-r from-[#02A9FF] to-[#8538F8] bg-clip-text text-transparent group-hover:from-[#02abffee] group-hover:to-[#8538f8ee]">
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
                className="lucide lucide-chevron-right ml-1 text-[#8538F8] group-hover:text-[#8538f8ee]"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </h2>
          <p className="mt-4 max-w-[450px] text-sm">
            PlayStation 4 Slim (PS4 Slim) là phiên bản tinh gọn của dòng PS4,
            mang lại hiệu suất ổn định và thiết kế nhỏ gọn, tiết kiệm không
            gian.
          </p>
          <p className="mt-2 max-w-[450px] text-sm">
            Với bộ vi xử lý AMD Jaguar 8 nhân và GPU AMD GCN, PS4 Slim hỗ trợ đồ
            họa Full HD và hiệu suất chơi game mượt mà. Máy còn được trang bị ổ
            cứng dung lượng lớn, cho phép lưu trữ nhiều trò chơi và dữ liệu.
          </p>
        </div>
      </div>
    </>
  );
}
