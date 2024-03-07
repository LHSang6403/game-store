import DashboardSidebar from "@app/(protected)/dashboard/Components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  return (
    <div className="max-w-screen flex min-h-screen w-full flex-row gap-4 px-10 xl:flex-col xl:px-6 sm:px-4">
      <div className="w-[20%] xl:w-full">
        <DashboardSidebar />
      </div>
      <div className="w-[80%] xl:w-full">{children}</div>
    </div>
  );
}
