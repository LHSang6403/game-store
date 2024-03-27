"use client";

import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import { useSession } from "@/zustand/useSession";
import { useRouter } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { session } = useSession();
  console.log(session);

  if (session && !("role" in session)) {
    router.push("/auth");
  }

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
