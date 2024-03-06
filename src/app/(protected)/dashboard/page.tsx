import RevenueBarChart from "@/app/(protected)/dashboard/Components/Charts/RevenueBarChart";
import SoldBarChart from "@/app/(protected)/dashboard/Components/Charts/SoldBarChart";
import StorageTable from "@/app/(protected)/dashboard/Components/StorageTable";
import RangeTime from "@/components/Picker/RangeTime";

export default function OverviewChart() {
  return (
    <section className="flex w-full flex-col gap-2 pb-10">
      <div className="mt-2 flex h-fit w-full flex-row items-center justify-between pl-2 sm:mb-2 sm:flex-col sm:gap-2">
        <h1 className="text-xl font-medium">Your Business Overview</h1>
        <RangeTime />
      </div>
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

// Bar chart: doanh thu, loi nhuan, lo theo thang/ nam -> done
// Bar: sold quantity hien tai tat ca cac san pham -> done

// tinh loi nhuan theo thang (loi nhuan = 20% * each order.price)
// -> tinh loi nhuan theo nam
