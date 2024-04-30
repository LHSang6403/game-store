"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOutHandler } from "@/app/auth/_actions/signOut";
import { useSession, SessionState } from "@/zustand/useSession";
import { toast } from "sonner";
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
  const pathname = usePathname();
  const { session, removeSession, isStaff } = useSession() as SessionState;

  const staffSession =
    session && "role" in session ? (session as StaffType) : null;

  return (
    <div className="flex h-full w-60 flex-col justify-between gap-2 border-r px-4 pt-4 xl:w-full xl:border-none xl:px-0">
      <nav className="flex flex-col gap-2 overflow-auto">
        {dashboardSidebarList.map((item, index) => {
          if (
            staffSession &&
            isStaff &&
            (item.permissions.length === 0 ||
              item.permissions.includes(staffSession?.role))
          )
            return (
              <Link
                key={index}
                href={item.link}
                className={`${
                  item.link === pathname.split("/").slice(0, 3).join("/")
                    ? "bg-accent shadow-sm"
                    : "bg-background"
                } hover:text-accent-foreground focus:text-accent-foreground mx-auto flex h-9 w-full
            flex-row  items-center gap-2 
            rounded-md px-4 py-2 text-sm font-medium 
            transition-colors hover:bg-accent focus:bg-accent 
            focus:outline-none disabled:pointer-events-none disabled:opacity-50 
            data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 
            
            `}
              >
                {item.icon}
                <span className="mt-0.5">{item.name}</span>
              </Link>
            );
        })}
      </nav>
      {session && (
        <Button
          onClick={async () => {
            const result = await signOutHandler();
            if (!result.error) {
              removeSession();
              toast.success("Đăng xuất thành công.");
            } else {
              toast.error("Đã có lỗi xãy ra khi đăng xuất.");
            }
          }}
          className="mb-4 mt-6 w-full text-background"
        >
          Đăng xuất
        </Button>
      )}
    </div>
  );
}
