// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@components/ui/table";
// import Image from "next/image";
import { DataTable } from "@components/Table/DataTable";
import { columns } from "./Columns";

export default function ReviewTable() {
  const reviewData = [
    {
      id: "1",
      name: "Sang le",
      review:
        "Exceptional service and quality, highly recommended for anyone seeking a reliable and efficient solution.",
      created_at: new Date().toString(),
    },
    {
      id: "2",
      name: "Sang le",
      review:
        "Exceptional service and quality, highly recommended for anyone seeking a reliable and efficient solution.",
      created_at: new Date().toString(),
    },
  ];

  return (
    <div className="max-w-[1000px] xl:max-w-[700px] sm:w-full h-fit mx-auto overflow-auto bg-background">
      <DataTable
        columns={columns}
        data={reviewData}
        isPaginationEnabled={true}
        isCollumnVisibilityEnabled={false}
        isSearchEnabled={false}
      />
    </div>
  );
}
