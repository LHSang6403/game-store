import Image from "next/image";
import Header from "@components/Layout/Header/Header";
import Link from "next/link";

export default function page() {
  const logos = [
    { name: "Play Station", url: "/assets/images/home/logos/1.png" },
    { name: "Nitendo Switch", url: "/assets/images/home/logos/2.png" },
    { name: "XBox", url: "/assets/images/home/logos/3.png" },
    { name: "Data Frog", url: "/assets/images/home/logos/4.png" },
    { name: "Zelda", url: "/assets/images/home/logos/5.png" },
    { name: "Dobe", url: "/assets/images/home/logos/6.png" },
  ];

  return (
    <div className="flex h-auto w-full max-w-[1600px] flex-col items-center pb-20">
      <Header />
      <div className="flex h-auto w-full flex-col items-center px-10 pt-10">
        <div className="relative w-full">
          <div className="absolute left-0 right-0 top-12 -z-20 flex w-full justify-center">
            <Image
              src="/assets/images/home/dot-bg.png"
              alt="Logo"
              width={900}
              height={900}
              className="opacity-50"
            />
          </div>
          <div className="absolute left-64 top-12 -z-10 flex h-fit w-fit justify-start pt-24">
            <Image
              src="/assets/images/home/blue-blur-bg.png"
              alt="Logo"
              width={1000}
              height={1000}
              className="-ml-4 opacity-90"
            />
          </div>
          <div className="absolute right-10 top-96 -z-10 flex justify-end pt-80">
            <p className="mt-20 text-left font-medium">
              2Win - Chúng tôi là một cộng đồng của những người đam mê game,
              <br></br> nơi mà mọi game thủ đều có thể tìm thấy những sản phẩm
              chất<br></br> lượng nhất và những trải nghiệm tuyệt vời nhất.
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-4">
          <h1 className="text-center text-6xl font-bold leading-[90px]">
            Thiết bị{" "}
            <span className="appearance-none bg-gradient-to-r from-[#9733ED] via-[#F22B9C] to-[#FD7A36] bg-clip-text text-transparent">
              chơi game
            </span>{" "}
            <br className=""></br>
            <span className="appearance-none bg-gradient-to-r from-[#9733ED] via-[#F22B9C] to-[#FD7A36] bg-clip-text text-transparent">
              chất lượng,{" "}
            </span>
            giá tốt nhất
          </h1>
          <Link
            href="/product"
            className="z-30 mt-6 h-fit rounded-full bg-foreground px-6 py-2 text-[15px] font-light text-background duration-200 ease-in-out hover:bg-foreground/90"
          >
            Khám phá sản phẩm
          </Link>
        </div>
        <div className="z-10 -mt-8">
          <Image
            src="/assets/images/gamePlay/g10.png"
            alt="Main"
            width={900}
            height={900}
            quality={100}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-4 px-36 xl:px-4 sm:px-2">
          <Link
            href="/product"
            className="mb-2 h-fit rounded-full border border-[#E9DFFF] bg-white px-4 py-0.5 text-[15px] font-light text-[#7F4AFD] hover:cursor-pointer"
          >
            Khám phá ngay
          </Link>
          <h1 className="text-6xl font-bold">
            <span className="appearance-none bg-gradient-to-r from-[#02A9FF] to-[#8537F8] bg-clip-text text-transparent">
              Sản phẩm
            </span>{" "}
            <br className="xl:hidden"></br> bán chạy
          </h1>
          <p className="font-light">
            Các sản phẩm bán chạy tại 2Win luôn là những thiết bị được game thủ
            ưa chuộng nhất, nổi bật với chất lượng vượt trội và tính năng đột
            phá. Những chiếc máy chơi game mới nhất từ PlayStation, Xbox và
            Nintendo luôn nằm trong top lựa chọn của khách hàng. Hãy đến với
            chúng tôi để khám phá những sản phẩm hot nhất và nâng cấp trải
            nghiệm chơi game của bạn!
          </p>
        </div>
        <div className="my-10 flex w-full flex-row px-36 xl:px-4 sm:px-2">
          <div className="w-1/2">
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
              Với thiết kế hiện đại và mạnh mẽ, PS5 được trang bị bộ vi xử lý
              AMD Ryzen Zen 2 và GPU RDNA 2, hỗ trợ đồ họa 4K chân thực và tốc
              độ khung hình lên đến 120fps.
            </p>
          </div>
          <div className="w-1/2">
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
              Với bộ vi xử lý AMD Jaguar 8 nhân và GPU AMD GCN, PS4 Slim hỗ trợ
              đồ họa Full HD và hiệu suất chơi game mượt mà. Máy còn được trang
              bị ổ cứng dung lượng lớn, cho phép lưu trữ nhiều trò chơi và dữ
              liệu.
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="">
            <Link
              href="/product"
              className="mb-2 h-fit rounded-full border border-[#E9DFFF] bg-white px-4 py-1 text-[15px] font-light text-[#7F4AFD]"
            >
              Xem giá trên website
            </Link>
          </div>
          <h1 className="text-center text-6xl font-bold leading-[90px]">
            <span className="appearance-none bg-gradient-to-r from-[#03A7FF] to-[#8439F8] bg-clip-text px-4 text-center text-transparent">
              Giá cả
            </span>
            sản phẩm<br></br>{" "}
            <span className="appearance-none bg-gradient-to-r from-[#03A7FF] to-[#8439F8] bg-clip-text px-4 text-center text-transparent">
              tốt nhất
            </span>
          </h1>
          <p className="text-center font-light">
            Tại Gaming Paradise, chúng tôi cam kết mang đến cho khách hàng những
            sản phẩm chơi game<br className="xl:hidden"></br> với giá thành hợp
            lý nhất. Với các chương trình khuyến mãi thường xuyên và chính sách
            giá cạnh tranh,<br className="xl:hidden"></br> bạn luôn có thể yên
            tâm mua sắm mà không lo về giá cả.
          </p>
          <div className="mt-8 flex w-36 flex-col justify-center gap-3">
            <Link
              href="https://www.facebook.com/profile.php?id=100054800213938"
              className="flex h-fit w-full items-center justify-center rounded-full bg-gradient-to-r from-[#707FFB] to-[#8537F8] p-[1px]"
            >
              <span className="flex h-fit w-full items-center justify-center rounded-full border bg-white py-0.5 text-[15px] text-background dark:text-white">
                Facebook
              </span>
            </Link>
            <Link
              href="https://shopee.vn/bepgaming"
              className="mb-2 flex h-fit w-full items-center justify-center rounded-full border border-[#E9DFFF] bg-gradient-to-r from-[#707FFB] to-[#8537F8] bg-clip-text py-1 text-[15px] text-black text-transparent dark:text-white"
            >
              Shopee
            </Link>
          </div>
        </div>
        <div className="mt-16 flex flex-row gap-3 bg-white">
          <div className="flex flex-col items-end gap-3">
            <div className="mt-28 h-fit overflow-hidden rounded-lg rounded-tl-[40px] shadow-xl">
              <Image
                src="/assets/images/fanpage/sp1.png"
                alt="Product 1"
                width={300}
                height={500}
                className="duration-300 ease-in-out hover:scale-[1.025]"
              />
            </div>
            <div className="h-fit w-fit overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/assets/images/fanpage/sp8.png"
                alt="Product 8"
                width={200}
                height={200}
                className="duration-300 ease-in-out hover:scale-[1.025]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-lg rounded-tl-[40px] shadow-xl">
              <Image
                src="/assets/images/fanpage/sp5.jpg"
                alt="Product 5"
                width={400}
                height={400}
                className="duration-300 ease-in-out hover:scale-[1.025]"
              />
            </div>
            <div className="w-fit overflow-hidden rounded-lg rounded-br-[40px] shadow-xl">
              <Image
                src="/assets/images/fanpage/sp3.png"
                alt="Product 3"
                width={400}
                height={500}
                className="duration-300 ease-in-out hover:scale-[1.025]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="mt-10 h-fit w-fit overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/assets/images/fanpage/sp7.png"
                alt="Product 7"
                width={200}
                height={200}
                className="duration-300 ease-in-out hover:scale-[1.025]"
              />
            </div>
            <div className="h-fit overflow-hidden rounded-lg rounded-br-[40px] shadow-xl">
              <Image
                src="/assets/images/fanpage/sp6.jpg"
                alt="Product 6"
                width={300}
                height={500}
                className="duration-300 ease-in-out hover:scale-[1.025]"
              />
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center gap-4">
          <h1 className="text-center text-6xl font-bold leading-[90px]">
            <span className="appearance-none bg-gradient-to-r from-[#FFB503] to-[#F83A79] bg-clip-text text-transparent">
              Các trò chơi
            </span>
            <br></br>
            đa dạng
          </h1>
          <p className="text-center font-light">
            Dù bạn yêu thích thể loại hành động, phiêu lưu, chiến thuật hay thể
            thao, chúng tôi đều có những tựa game phù hợp với bạn.<br></br> Các
            trò chơi nhập vai sẽ đưa bạn vào những câu chuyện sâu sắc và kỳ ảo,
            trong khi các game chiến thuật đòi hỏi sự tư duy và tính toán cẩn
            thận.
          </p>
        </div>
        <div className="mt-20 grid h-full grid-cols-2 items-center gap-10">
          <div className="flex h-full max-w-[500px] flex-col items-start justify-center gap-6 pl-10">
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
              <span className="appearance-none bg-gradient-to-r from-[#8D1BA6] to-[#F83A79] bg-clip-text text-transparent">
                phong phú
              </span>
            </h2>
            <p className="text-sm font-light">
              Đĩa chơi game là phụ kiện không thể thiếu<br></br> cho bất kỳ game
              thủ nào, mang lại sự tiện lợi<br></br> và linh hoạt trong việc
              truy cập và tận hưởng<br></br> các tựa game yêu thích. Với các đĩa
              chơi game như PlayStation Network Card, Xbox Live Gift Card,
              <br></br> bạn có thể dễ dàng nạp tiền vào tài khoản game<br></br>{" "}
              của mình để mua trò chơi, nội dung tải về (DLC),<br></br> và các
              dịch vụ trực tuyến khác.
            </p>
          </div>
          <div className="h-fit overflow-hidden rounded-xl shadow-xl">
            <Image
              src="/assets/images/home/game-disk.jpg"
              alt="Logo"
              width={500}
              height={500}
            />
          </div>
          <div className="h-fit overflow-hidden rounded-xl shadow-xl">
            <Image
              src="/assets/images/home/game-disk-2.jpg"
              alt="Logo"
              width={500}
              height={500}
            />
          </div>
          <div className="flex h-full max-w-[500px] flex-col items-start justify-center gap-6 pl-10">
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
              <span className="appearance-none bg-gradient-to-r from-[#0379FB] to-[#8D1BA6] bg-clip-text text-transparent">
                các thể loại
              </span>
            </h2>
            <p className="text-sm font-light">
              Ngoài việc cung cấp nhiều lựa chọn về mệnh giá,<br></br> thẻ chơi
              game còn mang lại nhiều ưu đãi<br></br> và khuyến mãi hấp dẫn từ
              các nhà phát hành.<br></br> Sử dụng thẻ chơi game, bạn có thể
              hưởng lợi<br></br> từ các đợt giảm giá, sự kiện đặc biệt và các
              gói<br></br> nội dung độc quyền, giúp tối ưu hóa trải nghiệm
              <br></br> chơi game của mình.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-32 flex h-auto w-full flex-col items-center pb-20">
        <div className="relative w-full">
          <div className="absolute left-1/2 top-0 h-fit w-full max-w-[1540px] -translate-x-1/2 overflow-hidden rounded-3xl">
            <Image
              src="/assets/images/home/black-blur-bg.png"
              alt="Logo"
              width={1540}
              height={1540}
            />
          </div>
          <div className="absolute left-0 right-0 top-32 h-fit w-full">
            <h1 className="text-center text-6xl font-bold leading-[90px] text-background dark:text-white">
              Phụ kiện
              <br className="xl:hidden"></br>
              <span className="appearance-none bg-gradient-to-r from-[#B153EA] to-[#FD9252] bg-clip-text text-transparent">
                chính hãng
              </span>
            </h1>
            <p className="mt-4 text-center font-light text-[#B5B3BA]">
              Tại 2Win, chúng tôi cung cấp các phụ kiện chính hãng từ những
              thương hiệu uy tín nhất.<br className="xl:hidden"></br> Từ tay
              cầm, tai nghe, đế sạc, túi đựng máy chơi game đến các phụ kiện
              khác, tất cả đều đảm bảo chất lượng và độ bền cao.
            </p>
          </div>
        </div>
        <div className="z-20 mt-96 grid h-full w-fit grid-cols-2">
          <div className="flex w-full flex-col justify-center gap-4 pl-28">
            <div>
              <Image
                src="/assets/images/home/paint.png"
                alt="Logo"
                width={50}
                height={50}
              />
            </div>
            <h2 className="text-4xl text-background dark:text-white">
              <span className="appearance-none bg-gradient-to-r from-[#C997F7] to-[#85E2FE] bg-clip-text text-transparent">
                Nitendo Switch
              </span>
              <br className="xl:hidden"></br> chính hãng
            </h2>
            <p className="text-sm text-[#B4B3BA]">
              Với thiết kế linh hoạt, Nintendo Switch cho phép<br></br> bạn chơi
              game ở ba chế độ khác nhau: chế độ TV<br></br> khi kết nối với
              dock để chơi trên màn hình lớn, chế độ<br></br> tabletop với chân
              đế tích hợp để chơi cùng bạn bè ở<br></br> bất kỳ đâu.
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
          <div className="flex flex-col justify-center gap-4 pl-28">
            <div>
              <Image
                src="/assets/images/home/flower.png"
                alt="Logo"
                width={50}
                height={50}
              />
            </div>
            <h2 className="text-4xl text-background dark:text-white">
              <span className="appearance-none bg-gradient-to-r from-[#C12AD1] to-[#FDAEA1] bg-clip-text text-transparent">
                XBox
              </span>
              <br className="xl:hidden"></br> chính hãng
            </h2>
            <p className="text-sm text-[#B4B3BA]">
              Được trang bị bộ vi xử lý AMD Zen 2 và GPU RDNA 2,<br></br> Xbox
              Series X hỗ trợ độ phân giải lên đến 4K và tốc độ<br></br> khung
              hình 120fps, đảm bảo trải nghiệm chơi game<br></br> mượt mà và
              chân thực. Với ổ cứng SSD 1TB NVMe.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-36 flex w-full flex-col items-center">
        <h1 className="text-center text-6xl font-bold leading-[90px] text-foreground">
          <span className="appearance-none bg-gradient-to-r from-[#B153EA] to-[#FD9252] bg-clip-text text-transparent">
            Thương hiệu
          </span>{" "}
          <br className="xl:hidden"></br>
          nổi bật
        </h1>
        <p className="mt-4 text-center font-light">
          Tại 2Win, chúng tôi cung cấp các phụ kiện chính hãng từ những thương
          hiệu uy tín nhất.<br className="xl:hidden"></br> Từ tay cầm, tai nghe,
          đế sạc, túi đựng máy chơi game đến các phụ kiện khác, tất cả đều đảm
          bảo chất lượng và độ bền cao.
        </p>
        <div className="mt-16 grid grid-cols-6 gap-6 px-4 lg:grid-cols-3 sm:gap-4">
          {logos.map((img, index) => (
            <div key={index}>
              <Image src={img.url} alt={img.name} width={220} height={150} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
