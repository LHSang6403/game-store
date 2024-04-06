"use client";

import DashboardSidebar, {
  dashboardSidebarList,
} from "@app/(protected)/dashboard/Components/DashboardSidebar";
import Footer from "@/components/Layout/Footer/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardHeader from "@/components/Layout/Header/DashboardHeader";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSession } from "@/zustand/useSession";
import { StaffType } from "@/utils/types";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const staffSession = session.session as StaffType;

  const isAuthorized = () => {
    if (!staffSession || !("role" in staffSession)) {
      router.push("/");
    }

    const currentPath = dashboardSidebarList.find(
      (dashboardSidebarItem) => dashboardSidebarItem.link === pathname
    );
    const currentPathPermission = currentPath?.permission;

    if (currentPathPermission && currentPathPermission !== staffSession.role) {
      return false;
    }

    return true;
  };

  if (!isAuthorized()) {
    router.push("/dashboard");
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
