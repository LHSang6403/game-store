"use client";

import { readUserSession } from "@app/auth/_actions/users";
import { useSession } from "@/zustand/useSession";
import { useEffect } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const { setSession } = useSession();

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await readUserSession();
      if (sessionData && sessionData.data) {
        setSession(sessionData.data);
      }
    };

    fetchSession();
  }, []);

  return <>{children}</>;
}
