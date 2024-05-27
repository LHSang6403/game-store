import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

export const metadata = {
  title: "2Win - Cửa hàng trò chơi điện tử hàng đầu tại Việt Nam",
  description:
    "Chúng tôi là cửa hàng trò chơi điện tử hàng đầu tại Việt Nam. Cung cấp sản phẩm chất lượng, giá cả phải chăng.",
  keywords: "trò chơi điện tử, giải trí, trò chơi online, cửa hàng trò chơi",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  return (
    <>
      <Header />
      <div className="flex h-fit min-h-screen w-full flex-col items-center gap-4 pt-16 xl:pt-0">
        {children}
      </div>
      <Footer />
    </>
  );
}
