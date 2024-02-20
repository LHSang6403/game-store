import DashboardSidebar from "@/app/(protected)/dashboard/Components/DashboardSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): ReturnType<React.FC> {
  return (
    <div className="w-full max-w-screen min-h-screen px-10 flex flex-row xl:flex-col gap-4">
      <div className="w-[20%] xl:w-full">
        <DashboardSidebar />
      </div>
      <div className="w-[80%] xl:w-full flex flex-col gap-4">{children}</div>
    </div>
  );
}
