"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const dashboardSidebarList = [
    { name: "Overview", link: "/dashboard" },
    { name: "Product", link: "/dashboard/product" },
    { name: "Order", link: "/dashboard/order" },
    { name: "Staff", link: "/dashboard/staff" },
    { name: "Customer", link: "/dashboard/customer" },
  ];

  return (
    <div className="h-[calc(100vh_-_6rem)] w-full rounded-br-lg rounded-tr-lg border-b border-r border-t border-foreground/10 xl:h-fit xl:border-none">
      <h1 className="mx-4 my-2 border-b border-foreground/10 pb-2 text-lg font-medium text-foreground xl:mx-0">
        Routes
      </h1>
      <ul className="flex flex-col gap-2 xl:h-12 xl:flex-row xl:overflow-auto">
        {dashboardSidebarList.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={`${
              "/dashboard/" + item.name.toLowerCase() === pathname
                ? "bg-accent"
                : "bg-background"
            } hover:text-accent-foreground 
            focus:text-accent-foreground mx-auto flex h-9 w-[96%] 
            items-center rounded-md  px-4 py-2 text-sm 
            font-medium transition-colors hover:bg-accent 
            focus:bg-accent focus:outline-none disabled:pointer-events-none 
            disabled:opacity-50 data-[active]:bg-accent/50 
            data-[state=open]:bg-accent/50 xl:w-32 xl:border 
            xl:border-foreground/10`}
          >
            {item.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}
