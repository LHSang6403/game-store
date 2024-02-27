import { GeistSans } from "geist/font/sans";
import "@app/styles/globals.css";
import "@app/styles/prosemirror.css";
import NavDrawer from "@components/Layout/Drawer/NavDrawer";
import ThemeProvider from "@components/Providers/ThemeProvider";
import ReactQueryProvider from "@components/Providers/ReactQueryProvider";
import Providers from "@components/Providers/Providers";

export const metadata = {
  title: "Gaming Store",
  description: "Buy the best gaming products at the best prices!",
  keywords: "game, store, online, console, pc, playstation, xbox, nintendo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`light ${GeistSans.className}`}
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <ReactQueryProvider>
            <Providers>
              <main className="mx-auto flex min-h-screen w-full max-w-[2200px] flex-col items-center overflow-hidden pt-16 xl:pt-0">
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
