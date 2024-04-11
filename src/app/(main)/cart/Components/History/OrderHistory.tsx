import { readOrdersByCustomerId } from "@/app/_actions/order";
import {
  columns,
  columns_headers,
} from "@app/(main)/cart/Components/History/Columns";
import { DataTable } from "@components/Table/DataTable";
import type { OrderType } from "@utils/types";
import { readUserSession } from "@/app/_actions/user";

export default async function OrderHistory() {
  const session = await readUserSession();

  const history = await readOrdersByCustomerId(
    session.data?.data?.session?.user?.id
  );

  return (
    <div className="mx-auto w-auto">
      {session.data && !history.error && "data" in history && (
        <>
          <h2 className="mb-1 text-center text-lg font-semibold">
            Lịch sử mua hàng
          </h2>
          <DataTable
            columns={columns}
            data={history.data as OrderType[]}
            isPaginationEnabled={true}
            isCollumnVisibilityEnabled={true}
            isSearchEnabled={false}
            columns_headers={columns_headers}
          />
        </>
      )}
    </div>
  );
}
