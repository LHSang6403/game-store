import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NavDrawer from "@components/Layout/Drawer/NavDrawer";
import ThemeProvider from "@components/Providers/ThemeProvider";

export const metadata = {
  title: "Next.js Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase.",
  keywords: "next.js, supabase, starter kit",
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
          <main className="w-screen max-w-[2200px] min-h-screen mx-auto overflow-hidden flex flex-col items-center">
            {children}
            <NavDrawer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
