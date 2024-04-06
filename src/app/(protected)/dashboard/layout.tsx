"use client";

import DashboardSidebar from "@app/(protected)/dashboard/Components/DashboardSidebar";
import Footer from "@/components/Layout/Footer/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardHeader from "@/components/Layout/Header/DashboardHeader";
import { useSession } from "@/zustand/useSession";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  const router = useRouter();
  const session = useSession();

  if (!session.session) {
    router.push("/auth");
  }

  return (
    <div className="flex w-full flex-col pt-16 sm:pt-0">
      <div className="">
        <DashboardHeader />
      </div>
      <div className="flex min-h-[80vh] w-full flex-row">
        <div className="xl:hidden">
          <DashboardSidebar />
        </div>
        <TooltipProvider>
          <div className="w-full p-4 pt-2 sm:p-2">{children}</div>
        </TooltipProvider>
      </div>
      <Footer />
    </div>
  );
}
