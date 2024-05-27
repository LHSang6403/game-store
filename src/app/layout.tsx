import { Work_Sans } from "next/font/google";

import "@app/styles/globals.css";
import "@app/styles/prosemirror.css";
import NavDrawer from "@components/Layout/Drawer/NavDrawer";
import ThemeProvider from "@components/Providers/ThemeProvider";
import ReactQueryProvider from "@components/Providers/ReactQueryProvider";
import Providers from "@components/Providers/Providers";

export const metadata = {
  title: "2Win - Cửa hàng trò chơi điện tử hàng đầu tại Việt Nam",
  description:
    "Chúng tôi là cửa hàng trò chơi điện tử hàng đầu tại Việt Nam. Cung cấp sản phẩm chất lượng, giá cả phải chăng.",
  keywords: "trò chơi điện tử, giải trí, trò chơi online, cửa hàng trò chơi",
};

const font = Work_Sans({
  // weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`light ${font.className}`}
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <ReactQueryProvider>
            <Providers>
              <main className="mx-auto flex min-h-screen w-auto max-w-[2200px] flex-col items-center overflow-hidden">
                {children}
                <NavDrawer />
              </main>
            </Providers>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
