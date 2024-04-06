import SecondaryLogo from "@/components/SecondaryLogo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex h-72 w-full flex-col justify-center gap-6 border-t border-t-foreground/10 p-10 text-center text-xs xl:mb-8 xl:h-fit sm:px-4">
      <div className="flex items-center justify-center">
        <SecondaryLogo />
      </div>
      <p>
        Chúng tôi là{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Game Store
        </a>
      </p>
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
      <nav className="mx-auto flex w-full flex-row justify-around sm:grid sm:grid-cols-2 sm:gap-3">
        <Link
          href="/"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
        >
          Trang chủ
        </Link>
        <Link
          href="/product"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
        >
          Sản phẩm
        </Link>
        <Link
          href="/cart"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
        >
          Giỏ hàng
        </Link>
        <Link
          href="/about"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
        >
          Giới thiệu
        </Link>
      </nav>
    </footer>
  );
}
