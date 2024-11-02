"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSession, SessionState } from "@/zustand/useSession";
import {
  Gamepad2,
  ListOrdered,
  Users,
  UsersRound,
  NotebookText,
  FileClock,
  Wallet,
  Folder,
  CopyPlus,
} from "lucide-react";
import { StaffType } from "@/utils/types";
import { useCallback, useMemo } from "react";

export const dashboardSidebarList = [
  {
    name: "Tổng quan",
    link: "/dashboard",
    icon: <Folder className="h-4 w-4" />,
    permissions: [],
  },
  {
    name: "Tài chính",
    link: "/dashboard/finance",
    icon: <Wallet className="h-4 w-4" />,
    permissions: ["Quản lý"],
  },
  {
    name: "Sản phẩm",
    link: "/dashboard/product",
    icon: <Gamepad2 className="h-4 w-4" />,
    permissions: ["Bán hàng", "Quản lý"],
  },
  {
    name: "Đơn hàng",
    link: "/dashboard/order",
    icon: <ListOrdered className="h-4 w-4" />,
    permissions: ["Bán hàng", "Quản lý"],
  },
  {
    name: "Nhân viên",
    link: "/dashboard/staff",
    icon: <Users className="h-4 w-4" />,
    permissions: ["Quản lý"],
  },
  {
    name: "Khách hàng",
    link: "/dashboard/customer",
    icon: <UsersRound className="h-4 w-4" />,
    permissions: ["Bán hàng", "Quản lý"],
  },
  {
    name: "Bài viết",
    link: "/dashboard/blog",
    icon: <NotebookText className="h-4 w-4" />,
    permissions: ["Biên tập", "Quản lý"],
  },
  {
    name: "Hoạt động",
    link: "/dashboard/log",
    icon: <FileClock className="h-4 w-4" />,
    permissions: ["Quản lý"],
  },
  {
    name: "Nhập kho",
    link: "/dashboard/insert",
    icon: <CopyPlus className="h-4 w-4" />,
    permissions: ["Bán hàng", "Quản lý"],
  },
];

export default function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { session, isStaff } = useSession() as SessionState;

  const dashboardPath = useMemo(() => {
    return pathname.split("/").slice(0, 3).join("/");
  }, [pathname]);

  const staffSession = useMemo(() => {
    return session && "role" in session ? (session as StaffType) : null;
  }, [session]);

  const filteredSidebarList = useMemo(() => {
    return dashboardSidebarList.filter(
      (item) =>
        staffSession &&
        isStaff &&
        (item.permissions.length === 0 ||
          item.permissions.includes(staffSession?.role))
    );
  }, [staffSession, isStaff]);

  const handleNavigation = useCallback(
    (link: string) => {
      router.push(link);
    },
    [router]
  );

  return (
    <div className="flex h-full w-full flex-col justify-between gap-2 border-r border-none px-0 pt-4 md:w-60 md:px-4">
      <nav className="flex flex-col gap-2 overflow-auto">
        {filteredSidebarList.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(item.link)}
            className={`${
              dashboardPath === item.link
                ? "bg-accent shadow-sm"
                : "bg-background"
            } mx-auto flex h-9 w-full flex-row items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ring-0 hover:cursor-pointer hover:bg-accent`}
          >
            {item.icon}
            <span className="mt-0.5">{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
