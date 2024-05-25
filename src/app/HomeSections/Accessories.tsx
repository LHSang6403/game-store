import Image from "next/image";

export default function Accessories() {
  return (
    <div className="mt-12 flex h-auto w-full flex-col items-center pb-20 xl:pb-0">
      <div className="relative w-full">
        <div className="absolute left-1/2 top-0 h-fit w-full max-w-[1540px] -translate-x-1/2 overflow-hidden rounded-3xl">
          <Image
            src="/assets/images/home/black-blur-bg.png"
            alt="Logo"
            width={1540}
            height={1540}
            className="lg:h-[1050px]"
          />
        </div>
        <div className="absolute left-0 right-0 top-32 h-fit w-full xl:top-16">
          <h1 className="text-center text-6xl font-bold leading-[90px] text-background dark:text-white xl:text-3xl">
            Phụ kiện
            <br></br>
            <span className="appearance-none bg-gradient-to-r from-[#B153EA] to-[#FD9252] bg-clip-text text-transparent">
              chính hãng
            </span>
          </h1>
          <p className="mt-4 text-center font-light text-[#B5B3BA] xl:px-6 sm:px-4 sm:text-sm">
            Tại 2Win, chúng tôi cung cấp các phụ kiện chính hãng từ những thương
            hiệu uy tín nhất.
            <br className="xl:hidden"></br> Từ tay cầm, tai nghe, đế sạc, túi
            đựng máy chơi game đến các phụ kiện khác, tất cả đều đảm bảo chất
            lượng và độ bền cao.
          </p>
        </div>
      </div>
      <div className="z-20 mt-96 grid h-full w-fit grid-cols-2 xl:mt-56 lg:mt-64 lg:w-full">
        <div className="flex w-full flex-col justify-center gap-4 pl-28 lg:col-span-2 lg:pl-6">
          <div>
            <Image
              src="/assets/images/home/buttons.png"
              alt="Logo"
              width={50}
              height={50}
              className="lg:w-6"
            />
          </div>
          <h2 className="text-4xl text-background dark:text-white xl:text-3xl">
            <span className="appearance-none bg-gradient-to-r from-[#027AFD] to-[#C533CE] bg-clip-text text-transparent">
              Nitendo Switch
            </span>
            <br className="xl:hidden"></br> chính hãng
          </h2>
          <p className="text-sm text-[#B4B3BA] lg:pr-4">
            Với thiết kế linh hoạt, Nintendo Switch cho phép
            <br className="lg:hidden"></br> bạn chơi game ở ba chế độ khác nhau:
            chế độ TV<br className="lg:hidden"></br> khi kết nối với dock để
            chơi trên màn hình lớn, chế độ
            <br className="lg:hidden"></br> tabletop với chân đế tích hợp để
            chơi cùng bạn bè ở<br className="lg:hidden"></br> bất kỳ đâu.
          </p>
        </div>
        <div className="">
          <Image
            src="/assets/images/gamePlay/g7.png"
            alt="Logo"
            width={550}
            height={550}
          />
        </div>
        <div className="">
          <Image
            src="/assets/images/gamePlay/g16.png"
            alt="Logo"
            width={550}
            height={550}
          />
        </div>
        <div className="flex flex-col justify-center gap-4 pl-28 lg:col-span-2 lg:pl-6">
          <div>
            <Image
              src="/assets/images/home/controller.png"
              alt="Logo"
              width={50}
              height={50}
              className="lg:w-6"
            />
          </div>
          <h2 className="text-4xl text-background dark:text-white xl:text-3xl">
            <span className="appearance-none bg-gradient-to-r from-[#C12AD1] to-[#FDAEA1] bg-clip-text text-transparent">
              XBox
            </span>
            <br className="xl:hidden"></br> chính hãng
          </h2>
          <p className="text-sm text-[#B4B3BA] lg:pr-4">
            Được trang bị bộ vi xử lý AMD Zen 2 và RDNA 2,
            <br className="lg:hidden"></br> Xbox Series X hỗ trợ độ phân giải
            lên đến 4K và<br className="lg:hidden"></br> tốc độ khung hình
            120fps, đảm bảo trải nghiệm
            <br className="lg:hidden"></br> chơi game mượt mà và chân thực. Với
            ổ cứng<br className="lg:hidden"></br> SSD 1TB NVMe.
          </p>
        </div>
      </div>
    </div>
  );
}
