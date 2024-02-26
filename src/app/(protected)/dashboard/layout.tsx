import DashboardSidebar from "@app/(protected)/dashboard/Components/DashboardSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  return (
    <div className="max-w-screen flex min-h-screen w-full flex-row gap-4 px-10 xl:flex-col xl:px-6 sm:px-4">
      <div className="w-[20%] xl:w-full">
        <DashboardSidebar />
      </div>
      <div className="flex w-[80%] flex-col gap-4 xl:w-full">{children}</div>
    </div>
  );
}
