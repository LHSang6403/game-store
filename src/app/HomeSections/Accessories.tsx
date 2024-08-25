import Image from "next/image";

export default function Accessories() {
  return (
    <div className="mt-12 flex h-auto w-full flex-col items-center xl:pb-0">
      <div className="relative h-full w-full pb-6">
        <div className="absolute left-1/2 top-0 -z-10 h-full w-full max-w-[1540px] -translate-x-1/2 overflow-hidden rounded-3xl">
          <Image
            src="/assets/images/home/black-blur-bg.png"
            alt="Decoration"
            className="object-fit !relative h-[100%] max-w-[1540px]"
            priority
            quality={100}
            fill
          />
        </div>
        <div className="mt-32 h-fit w-full xl:mt-10">
          <h1 className="text-center text-4xl font-bold text-background dark:text-white xl:text-3xl">
            Phụ kiện
            <br></br>
            <span className="appearance-none bg-gradient-to-r from-cpurple to-corange bg-clip-text text-transparent">
              chính hãng
            </span>
          </h1>
          <p className="mt-4 px-4 text-center font-light text-[#FFFFFF] sm:text-sm">
            Tại 2Win, chúng tôi cung cấp các phụ kiện chính hãng từ những thương
            hiệu uy tín nhất.
            <br className="xl:hidden"></br> Từ tay cầm, tai nghe, đế sạc, túi
            đựng máy chơi game đến các phụ kiện khác, tất cả đều đảm bảo chất
            lượng và độ bền cao.
          </p>
        </div>
        <div className="z-20 mx-auto mt-10 grid h-fit w-fit grid-cols-2 lg:w-full">
          <div className="flex w-full flex-col justify-center gap-4 pl-28 xl:px-6 lg:col-span-2">
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
              <span className="appearance-none bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-transparent">
                Nitendo Switch
              </span>
              <br className="xl:hidden"></br> chính hãng
            </h2>
            <p className="text-sm text-[#FFFFFF] lg:pr-4">
              Với thiết kế linh hoạt, Nintendo Switch cho phép bạn chơi game ở
              ba chế độ khác nhau: chế độ TV khi kết nối với dock để chơi trên
              màn hình lớn, chế độ tabletop với chân đế tích hợp để chơi cùng
              bạn bè ở bất kỳ đâu.
            </p>
          </div>
          <div className="">
            <Image
              src="/assets/images/gamePlay/g7.png"
              alt="Logo"
              width={550}
              height={550}
              className="lg:w-64"
              priority
            />
          </div>
          <div className="">
            <Image
              src="/assets/images/gamePlay/g16.png"
              alt="Logo"
              width={550}
              height={550}
              className="lg:w-64"
              priority
            />
          </div>
          <div className="flex flex-col justify-center gap-4 pl-28 xl:px-6 lg:col-span-2">
            <div>
              <Image
                src="/assets/images/home/controller.png"
                alt="Logo"
                width={50}
                height={50}
                className="lg:w-6"
                priority
              />
            </div>
            <h2 className="text-4xl text-background dark:text-white xl:text-3xl">
              <span className="appearance-none bg-gradient-to-r from-cpurple to-corange bg-clip-text text-transparent">
                XBox
              </span>
              <br className="xl:hidden"></br> chính hãng
            </h2>
            <p className="pr-4 text-sm text-[#FFFFFF]">
              Được trang bị bộ vi xử lý AMD Zen 2 và RDNA 2, Xbox Series X hỗ
              trợ độ phân giải lên đến 4K và tốc độ khung hình 120fps, đảm bảo
              trải nghiệm chơi game mượt mà và chân thực. Với ổ cứng SSD 1TB
              NVMe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
