"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
} from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import { defaultFontMapper } from "@app/styles/fonts";
import useLocalStorage from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { readUserSession } from "@/app/_actions/user";
import { useSession, SessionState } from "@/zustand/useSession";
import { useEffect } from "react";

export const AppContext = createContext<{
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
}>({
  font: "Default",
  setFont: () => {},
});

const ToasterProvider = () => {
  const { theme } = useTheme() as {
    theme: "light" | "dark" | "system";
  };
  return <Toaster theme={theme} position="top-right" />;
};

export default function Providers({ children }: { children: ReactNode }) {
  const [font, setFont] = useLocalStorage<string>("novel__font", "Default");

  const { setSession } = useSession() as SessionState;

  const displayFontMapper = useMemo(
    () => ({
      Default: "",
      Serif: "",
      Mono: "",
    }),
    []
  );

  const displayFont = useMemo(
    () => displayFontMapper[font] || "",
    [font, displayFontMapper]
  );
  const defaultFont = useMemo(() => defaultFontMapper[font] || "", [font]);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await readUserSession();

      if (
        session.data &&
        "detailData" in session.data &&
        session.data.detailData
      ) {
        setSession(session.data.detailData);
      }
    };

    fetchSession();
  }, []);

  return (
    <ThemeProvider attribute="class">
      <AppContext.Provider
        value={{
          font,
          setFont: setFont as Dispatch<SetStateAction<string>>,
        }}
      >
        <ToasterProvider />
        <div className={cn(displayFont, defaultFont)}>{children}</div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}
