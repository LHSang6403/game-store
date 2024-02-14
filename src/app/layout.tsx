import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NavDrawer from "@components/Layout/Drawer/NavDrawer";
import ThemeProvider from "@components/Providers/ThemeProvider";

export const metadata = {
  title: "Phone & Accessories Store",
  description: "Buy the best smartphones, tablets, laptops and accessories.",
  keywords: "smartphone, phone, tablet, laptop, accessories, store, shop, buy",
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
          <main className="w-full max-w-[2200px] min-h-screen mx-auto overflow-hidden flex flex-col items-center">
            {children}
            <NavDrawer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
