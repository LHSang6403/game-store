import { readOrdersByCustomerId } from "@/app/_actions/order";
import {
  columns,
  columns_headers,
} from "@/app/(main)/cart/_components/History/Columns";
import { DataTable } from "@components/Table/DataTable";
import type { OrderType } from "@utils/types";
import { readUserSession } from "@/app/_actions/user";

export default async function OrderHistory() {
  const session = await readUserSession();

  const history = await readOrdersByCustomerId(
    session.data?.data?.session?.user?.id
  );

  return (
    <div className="w-full">
      {session.data && "data" in history && (
        <div className="flex w-full flex-col items-center">
          <span className="mb-1 bg-gradient-to-r from-cpurple via-cpink to-corange bg-clip-text text-lg font-semibold text-transparent">
            Lịch sử mua hàng
          </span>
          <div className="mt-4 w-full">
            <DataTable
              columns={columns}
              data={history.data as OrderType[]}
              isPaginationEnabled={true}
              isCollumnVisibilityEnabled={true}
              isSearchEnabled={false}
              columns_headers={columns_headers}
            />
          </div>
        </div>
      )}
    </div>
  );
}
