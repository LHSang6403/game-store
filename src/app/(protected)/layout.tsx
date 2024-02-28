import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  return (
    <>
      <Header />
      <div className="flex min-h-screen w-full flex-col gap-4 pt-16 xl:pt-0">
        {children}
      </div>
      <Footer />
    </>
  );
}
