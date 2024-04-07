"use client";

import { useSession } from "@/zustand/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session.session || !("role" in session.session)) {
      router.push("/auth");
    }
  }, []);
  return <div className="min-h-screen w-full">{children}</div>;
}
