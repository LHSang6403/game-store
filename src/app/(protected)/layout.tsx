"use client";

import { Roboto } from "next/font/google";
import { useSession } from "@/zustand/useSession";
import { useRouter } from "next/navigation";

const layout_font = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

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
    <div className={`min-h-screen w-full ${layout_font.className}`}>
      {children}
    </div>
  );
}
