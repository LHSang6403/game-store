"use client";

import DashboardSidebar from "@app/(protected)/dashboard/Components/DashboardSidebar";
import Footer from "@/components/Layout/Footer/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardHeader from "@/components/Layout/Header/DashboardHeader";
import { useSession, SessionState } from "@/zustand/useSession";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { dashboardSidebarList } from "@app/(protected)/dashboard/Components/DashboardSidebar";
import { useEffect } from "react";
import { StaffType } from "@/utils/types";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession() as SessionState;

  const staffSession =
    session.session && "role" in session.session
      ? (session.session as StaffType)
      : null;

  useEffect(() => {
    const authorize = () => {
      const currentPath = dashboardSidebarList.find(
        (dashboardSidebarItem) => dashboardSidebarItem.link === pathname
      );
      const currentPathPermissions = currentPath?.permissions ?? [];

      if (
        !staffSession ||
        (currentPathPermissions.length > 0 &&
          staffSession &&
          !currentPathPermissions.includes(staffSession.role))
      ) {
        return router.push("/dashboard");
      }
    };

    authorize();
  }, []);

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
          <div className="w-full px-4 pt-2 sm:p-2">{children}</div>
        </TooltipProvider>
      </div>
      <Footer />
    </div>
  );
}
