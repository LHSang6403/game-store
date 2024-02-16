import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NavDrawer from "@components/Layout/Drawer/NavDrawer";
import ThemeProvider from "@components/Providers/ThemeProvider";
import ReactQueryProvider from "@components/Providers/ReactQueryProvider";

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
            <main className="w-full max-w-[2200px] min-h-screen mx-auto overflow-hidden flex flex-col items-center">
              {children}
              <NavDrawer />
            </main>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
