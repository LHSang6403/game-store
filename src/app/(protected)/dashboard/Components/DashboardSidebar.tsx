import Link from "next/link";

export default function DashboardSidebar() {
  const dashboardSidebarList = [
    { name: "Overview", link: "/dashboard" },
    { name: "Product", link: "/dashboard/product" },
    { name: "Order", link: "/dashboard/order" },
    { name: "Staff", link: "/dashboard/staff" },
    { name: "Customer", link: "/dashboard/customer" },
  ];

  return (
    <div className="w-full h-[calc(100vh_-_6rem)] xl:h-fit border-t border-r border-b xl:border-none rounded-br-lg rounded-tr-lg border-foreground/10">
      <h1 className="mx-4 xl:mx-0 text-2xl font-medium mb-2 pb-2 border-b border-foreground/10 text-foreground">
        Routes
      </h1>
      <ul className="flex flex-col gap-2 xl:h-12 xl:flex-row xl:overflow-auto">
        {dashboardSidebarList.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="w-full xl:w-32 h-9 flex items-center px-4 py-2 rounded-md bg-background xl:border xl:border-foreground/10 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          >
            {item.name}
          </Link>
        ))}
      </ul>
    </div>
  );
}
