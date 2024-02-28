import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

export const metadata = {
  title: "Game Store",
  description: "High-end gaming products in Vietnam.",
  keywords: "game, store, online, console, pc, playstation, xbox, nintendo",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  return (
    <>
      <Header />
      <div className="flex h-fit min-h-screen w-full flex-col gap-4 pt-16 xl:pt-0">
        {children}
      </div>
      <Footer />
    </>
  );
}
