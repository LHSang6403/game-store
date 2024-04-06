"use client";

import { StaffType } from "@/utils/types";
import { useSession } from "@/zustand/useSession";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { dashboardSidebarList } from "@app/(protected)/dashboard/Components/DashboardSidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const staffSession = session.session as StaffType;

  const isAuthorized = () => {
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

  return <div className="min-h-screen w-full">{children}</div>;
}
