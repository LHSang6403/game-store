import RevenueBarChart from "@/app/(protected)/dashboard/Components/Charts/RevenueBarChart";
import SoldBarChart from "@/app/(protected)/dashboard/Components/Charts/SoldBarChart";
import StorageTable from "@/app/(protected)/dashboard/Components/StorageTable";

// Bar chart: doanh thu, loi nhuan, lo theo thang/ nam -> done
// Bar: sold quantity hien tai tat ca cac san pham -> done

// tinh loi nhuan theo thang (loi nhuan = 20% * each order.price)
// -> tinh loi nhuan theo nam

export default function OverviewChart() {
  return (
    <section className="flex flex-col gap-3 pb-10">
      <div className="grid h-fit w-full grid-cols-2 gap-3">
        <div className="col-span-2">
          <RevenueBarChart />
        </div>
        <div className="col-span-1 xl:col-span-2">
          <SoldBarChart />
        </div>
        <div className="col-span-1 xl:col-span-2">
          <StorageTable />
        </div>
      </div>
    </section>
  );
}
