"use client";

import DashboardSidebar from "@/app/(protected)/dashboard/_components/DashboardSidebar";
import Footer from "@/components/Layout/Footer/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardHeader from "@/components/Layout/Header/DashboardHeader";
import { useSession, SessionState } from "@/zustand/useSession";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { dashboardSidebarList } from "@/app/(protected)/dashboard/_components/DashboardSidebar";
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

  useEffect(() => {
    const authorize = (staffSession: StaffType | null) => {
      const currentPath = dashboardSidebarList.find(
        (dashboardSidebarItem) => dashboardSidebarItem.link === pathname
      );
      const currentPathPermissions = currentPath?.permissions ?? [];

      if (
        currentPathPermissions.length > 0 &&
        staffSession &&
        !currentPathPermissions.includes(staffSession.role)
      ) {
        return router.push("/dashboard");
      }
    };

    if (session.session && !session.isAdmin && !session.isStaff) {
      return router.push("/");
    }

    const staffSession =
      session.isAdmin || session.isStaff
        ? (session.session as StaffType)
        : null;

    authorize(staffSession);
  }, [session.session]);

  return (
    <div className="flex w-full flex-col pt-0 md:pt-16">
      <div>
        <DashboardHeader />
      </div>
      <div className="flex min-h-[80vh] w-full flex-row">
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>
        <TooltipProvider>
          <div className="w-full p-2 md:px-4 md:pt-2">{children}</div>
        </TooltipProvider>
      </div>
      <Footer />
    </div>
  );
}
