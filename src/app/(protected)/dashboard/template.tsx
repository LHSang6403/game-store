"use client";

import { useSession } from "@/zustand/useSession";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { dashboardSidebarList } from "@app/(protected)/dashboard/Components/DashboardSidebar";
import { useEffect } from "react";
import { StaffType } from "@/utils/types";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const session = useSession();
  const pathname = usePathname();
  const staffSession = session.session as StaffType;

  useEffect(() => {
    const isAuthorized = () => {
      const currentPath = dashboardSidebarList.find(
        (dashboardSidebarItem) => dashboardSidebarItem.link === pathname
      );
      const currentPathPermission = currentPath?.permission;

      if (
        currentPathPermission &&
        currentPathPermission !== staffSession.role
      ) {
        return false;
      }

      return true;
    };

    if (!isAuthorized()) {
      router.push("/dashboard");
    }
  }, [pathname]);

  return <>{children}</>;
}
