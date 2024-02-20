"use client";

import { Dispatch, ReactNode, SetStateAction, createContext } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { displayFontMapper, defaultFontMapper } from "@app/styles/fonts";
import useLocalStorage from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";

import { readUserSession } from "@app/auth/_actions/users";
import { useSession } from "@/zustand/useSession";
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
  return <Toaster theme={theme} />;
};

export default function Providers({ children }: { children: ReactNode }) {
  const [font, setFont] = useLocalStorage<string>("novel__font", "Default");

  const displayFontMapper: { [key: string]: string } = {
    Default: "",
    Serif: "",
    Mono: "",
  };
  const defaultFontMapper: { [key: string]: string } = {
    Default: "",
    Serif: "",
    Mono: "",
  };
  const displayFont = displayFontMapper[font] || "";
  const defaultFont = defaultFontMapper[font] || "";

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

  return (
    <ThemeProvider
      attribute="class"
      value={{
        light: "light-theme",
        dark: "dark-theme",
      }}
    >
      <AppContext.Provider
        value={{
          font,
          setFont: setFont as Dispatch<SetStateAction<string>>,
        }}
      >
        <ToasterProvider />
        <div className={cn(displayFont, defaultFont)}>{children}</div>
        <Analytics />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
