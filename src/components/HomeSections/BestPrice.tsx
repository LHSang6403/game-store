import Image from "next/image";
import Link from "next/link";

export default function BestPrice() {
  return (
    <>
      <div className="mt-16 flex flex-col items-center gap-4">
        <div className="">
          <Link
            href="/product"
            className="mb-2 h-fit rounded-full border border-[#E9DFFF] bg-white px-4 py-1 text-[15px] font-light text-cpurple"
          >
            Xem giá trên website
          </Link>
        </div>
        <h1 className="text-center text-3xl font-bold md:text-4xl">
          <span className="appearance-none bg-gradient-to-r from-cblue to-cpurple bg-clip-text px-2 text-center text-transparent md:px-0">
            Giá cả
          </span>{" "}
          sản phẩm<br></br>
          <span className="appearance-none bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-center text-transparent">
            tốt nhất
          </span>
        </h1>
        <p className="text-center font-light sm:text-sm">
          Tại 2Win, chúng tôi cam kết mang đến cho khách hàng những sản phẩm
          chơi game<br className="hidden md:block"></br> với giá thành hợp lý
          nhất. Với các chương trình khuyến mãi thường xuyên và chính sách giá
          cạnh tranh,
          <br className="hidden md:block"></br> bạn luôn có thể yên tâm mua sắm
          mà không lo về giá cả.
        </p>
        <div className="mt-4 flex w-36 flex-col justify-center gap-3 md:mt-8">
          <Link
            href="https://www.facebook.com/profile.php?id=100054800213938"
            className="flex h-fit w-full items-center justify-center rounded-full bg-gradient-to-r from-cblue to-cpurple p-[1px]"
          >
            <span className="flex h-fit w-full items-center justify-center rounded-full border bg-white py-0.5 text-[15px] text-background dark:text-white">
              Facebook
            </span>
          </Link>
          <Link
            href="https://shopee.vn/bepgaming"
            className="mb-2 flex h-fit w-full items-center justify-center rounded-full border border-[#E9DFFF] bg-gradient-to-r from-cblue to-cpurple bg-clip-text py-1 text-[15px] text-black text-transparent dark:text-white"
          >
            Shopee
          </Link>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-2 bg-white md:mt-16 md:grid-cols-3 md:gap-3">
        <div className="flex flex-col items-end gap-2 md:gap-3">
          <div className="mt-10 h-fit w-full max-w-[150px] overflow-hidden rounded-lg rounded-tl-[40px] shadow-xl md:mt-28">
            <Image
              src="/assets/images/fanpage/sp1.png"
              alt="Product 1"
              className="object-fit !relative h-[100%] max-w-[300px] duration-300 ease-in-out hover:scale-[1.025]"
              priority
              quality={100}
              fill
            />
          </div>
          <div className="h-fit w-full overflow-hidden rounded-lg shadow-xl md:w-fit">
            <Image
              src="/assets/images/fanpage/sp8.png"
              alt="Product 8"
              className="object-fit !relative h-[100%] max-w-[250px] duration-300 ease-in-out hover:scale-[1.025] md:max-w-[200px]"
              priority
              quality={100}
              fill
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3">
          <div className="overflow-hidden rounded-lg rounded-tl-[40px] shadow-xl">
            <Image
              src="/assets/images/fanpage/sp5.jpg"
              alt="Product 5"
              className="object-fit !relative h-[100%] max-w-[400px] duration-300 ease-in-out hover:scale-[1.025]"
              priority
              quality={100}
              fill
            />
          </div>
          <div className="w-fit overflow-hidden rounded-lg rounded-br-[40px] shadow-xl">
            <Image
              src="/assets/images/fanpage/sp3.png"
              alt="Product 3"
              className="object-fit !relative h-[100%] max-w-[400px] duration-300 ease-in-out hover:scale-[1.025]"
              priority
              quality={100}
              fill
            />
          </div>
        </div>
        <div className="hidden flex-col gap-3 md:flex">
          <div className="mt-0 h-fit w-fit overflow-hidden rounded-lg shadow-xl md:mt-10">
            <Image
              src="/assets/images/fanpage/sp7.png"
              alt="Product 7"
              className="object-fit !relative h-[100%] max-w-[200px] duration-300 ease-in-out hover:scale-[1.025]"
              priority
              quality={100}
              fill
            />
          </div>
          <div className="-mt-12 h-fit w-fit overflow-hidden rounded-lg rounded-br-[40px] shadow-xl md:mt-0">
            <Image
              src="/assets/images/fanpage/sp6.jpg"
              alt="Product 6"
              className="object-fit !relative h-[100%] max-w-[300px] duration-300 ease-in-out hover:scale-[1.025]"
              priority
              quality={100}
              fill
            />
          </div>
        </div>
      </div>
    </>
  );
}
