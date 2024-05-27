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
        <h1 className="text-center text-4xl font-bold xl:text-3xl">
          <span className="appearance-none bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-center text-transparent xl:px-2">
            Giá cả
          </span>{" "}
          sản phẩm<br></br>
          <span className="appearance-none bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-center text-transparent">
            tốt nhất
          </span>
        </h1>
        <p className="text-center font-light sm:text-sm">
          Tại Gaming Paradise, chúng tôi cam kết mang đến cho khách hàng những
          sản phẩm chơi game<br className="xl:hidden"></br> với giá thành hợp lý
          nhất. Với các chương trình khuyến mãi thường xuyên và chính sách giá
          cạnh tranh,
          <br className="xl:hidden"></br> bạn luôn có thể yên tâm mua sắm mà
          không lo về giá cả.
        </p>
        <div className="mt-8 flex w-36 flex-col justify-center gap-3 sm:mt-4">
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
      <div className="mt-16 grid grid-cols-3 gap-3 bg-white xl:mt-10 sm:grid-cols-2 sm:gap-2">
        <div className="flex flex-col items-end gap-3 sm:gap-2">
          <div className="mt-28 h-fit overflow-hidden rounded-lg rounded-tl-[40px] shadow-xl xl:mt-10">
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
        <div className="flex flex-col gap-3 sm:gap-2">
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
        <div className="flex flex-col gap-3 sm:hidden">
          <div className="mt-10 h-fit w-fit overflow-hidden rounded-lg shadow-xl sm:mt-0">
            <Image
              src="/assets/images/fanpage/sp7.png"
              alt="Product 7"
              width={200}
              height={200}
              className="duration-300 ease-in-out hover:scale-[1.025]"
            />
          </div>
          <div className="h-fit w-fit overflow-hidden rounded-lg rounded-br-[40px] shadow-xl sm:-mt-12">
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
    </>
  );
}
