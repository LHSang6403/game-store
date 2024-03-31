"use client";

import RangeTime from "@/components/Picker/RangeDate/RangeTime";
import DashboardSidebar from "@app/(protected)/dashboard/Components/DashboardSidebar";
import Footer from "@/components/Layout/Footer/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardHeader from "@/components/Layout/Header/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  return (
    <div className="flex w-full flex-col">
      <div className="">
        <DashboardHeader />
      </div>
      <div className="flex min-h-[80vh] w-full flex-row">
        <div className="xl:hidden">
          <DashboardSidebar />
        </div>
        <TooltipProvider>
          <div className="w-full p-4 pt-2 sm:p-2">
            <div className="my-2 hidden w-full sm:block">
              <RangeTime />
            </div>
            {children}
          </div>
        </TooltipProvider>
      </div>
      <Footer />
    </div>
  );
}
