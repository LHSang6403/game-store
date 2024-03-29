"use client";

import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import Link from "next/link";
import { useSession } from "@/zustand/useSession";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useSession();
  console.log(session);

  if (session && !("role" in session)) {
    return (
      <div className="mt-10 flex flex-col items-center">
        <span className="text-xl font-medium">
          You can not access this area.{" "}
        </span>
        <Link
          className="text-base text-foreground/80 hover:text-foreground"
          href="/auth"
        >
          Login another account.
        </Link>
      </div>
    );
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
