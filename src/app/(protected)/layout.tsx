"use client";

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
    router.push("/");
  }

  return <div className="min-h-screen w-full">{children}</div>;
}
