import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@components/ui/layout/Header";
import SideBar from "@components/ui/layout/SideBar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="w-auto h-screen text-foreground p-1">
        <main className="w-full h-full bg-background flex flex-col items-center rounded-3xl overflow-hidden">
          <Header />
          <div className="w-full h-full flex flex-row justify-between pl-10">
            <SideBar />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
