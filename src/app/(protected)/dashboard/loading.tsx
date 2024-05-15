import DashboardColumnsSkeleton from "@/app/(protected)/dashboard/Components/DashboardColumnsSkeleton";

export default function loading() {
  return (
    <div className="pt-2">
      <DashboardColumnsSkeleton />
    </div>
  );
}
