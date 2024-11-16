import DashboardColumnsSkeleton from "@/app/(protected)/dashboard/_components/DashboardColumnsSkeleton";

export default function loading() {
  return (
    <div className="pt-2">
      <DashboardColumnsSkeleton />
    </div>
  );
}
