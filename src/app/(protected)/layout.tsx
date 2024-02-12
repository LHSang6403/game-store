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
      <div className="w-full min-h-screen flex flex-col gap-4">{children}</div>
      <Footer />
    </>
  );
}
