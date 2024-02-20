import AreaChartOverview from "@/app/(protected)/dashboard/Components/Charts/AreaChart";
import BarChartOverview from "@/app/(protected)/dashboard/Components/Charts/BarChart";

export default function OverviewChart() {
  return (
    <section className="">
      <div className="w-full h-fit flex flex-col gap-2 items-center">
        <AreaChartOverview />
        <BarChartOverview />
      </div>
    </section>
  );
}
