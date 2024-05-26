import PrimaryLogo from "@/components/PrimaryLogo";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex h-fit w-full flex-col justify-center gap-6 border-t border-t-foreground/10 p-10 pt-2 text-center text-xs xl:mb-8 sm:px-4">
      <div className="relative">
        <div className="absolute -left-10 -top-4 -z-10">
          <Image
            alt="Facebook"
            src="/assets/images/corner-bg.png"
            width={400}
            height={400}
            className="opacity-50"
          />
        </div>
        <div className="absolute -right-10 top-16 -z-10">
          <Image
            alt="Facebook"
            src="/assets/images/corner-bg.png"
            width={350}
            height={350}
            className="rotate-[180deg] opacity-50"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <PrimaryLogo />
      </div>
      <p className="mx-auto line-clamp-4 w-full overflow-ellipsis text-justify sm:max-w-full">
        Chào mừng đến với cửa hàng đồ chơi game hàng đầu tại Việt Nam! Tại cửa
        hàng của chúng tôi, chúng tôi tự hào mang đến cho bạn một trải nghiệm
        mua sắm độc đáo và đầy thú vị. Với một sự lựa chọn đa dạng các sản phẩm
        đồ chơi game từ các thương hiệu uy tín và độc quyền, chúng tôi cam kết
        đem lại cho bạn những trải nghiệm chơi game tuyệt vời nhất. Không chỉ là
        một cửa hàng bán hàng, chúng tôi còn là điểm đến của cộng đồng game thủ,
        nơi mà bạn có thể chia sẻ niềm đam mê với những người cùng sở thích. Đội
        ngũ nhân viên giàu kinh nghiệm và nhiệt huyết của chúng tôi luôn sẵn
        lòng hỗ trợ và tư vấn cho bạn về các sản phẩm và dịch vụ phù hợp nhất.
        Hãy đến và khám phá cửa hàng của chúng tôi ngay hôm nay để trải nghiệm
        sự khác biệt và thỏa mãn niềm đam mê chơi game của bạn!
      </p>
      <div className="flex w-full flex-row justify-between">
        <div className="flex w-fit flex-col items-start gap-2 pt-4">
          <h3 className="bg-gradient-to-r from-[#6f18f3] to-[#51c5fe] bg-clip-text text-lg text-transparent">
            Thông tin
          </h3>
          <p>
            Địa chỉ: 58/14A Tôn Thất Thuyết, Phường 18, Quận 4, Thành phố Hồ Chí
            Minh
          </p>
          <p>Số điện thoại: 097 692 3428</p>
          <p>Email: 2wingames.store@gmail.com</p>
        </div>
        <div className="flex w-fit flex-col items-start gap-2 pt-6">
          <h3 className="bg-gradient-to-r from-[#6f18f3] to-[#51c5fe] bg-clip-text text-lg text-transparent">
            Mạng xã hội
          </h3>
          <div className="flex flex-row gap-2">
            <Link href="https://www.facebook.com/profile.php?id=100054800213938">
              <Image
                alt="Facebook"
                src="/assets/images/fb.png"
                width={40}
                height={40}
              />
            </Link>
            <Link href="https://shopee.vn/bepgaming">
              <Image
                alt="Shopee"
                src="/assets/images/shopee.png"
                width={45}
                height={45}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
