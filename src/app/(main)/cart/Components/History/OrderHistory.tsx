import { readOrdersByCustomerId } from "@/app/_actions/order";
import { columns } from "@app/(main)/cart/Components/History/Columns";
import { DataTable } from "@components/Table/DataTable";
import type { OrderType } from "@utils/types";
import { readUserSession } from "@/app/_actions/user";

export default async function OrderHistory() {
  const session = await readUserSession();

  const history = await readOrdersByCustomerId(
    session.data?.data?.session?.user?.id
  );

  return (
    <div className="mx-auto w-fit xl:w-auto">
      {session.data && !history.error && "data" in history && (
        <>
          <h2 className="mb-1 text-lg font-semibold">Your history</h2>
          <DataTable
            columns={columns}
            data={history.data as OrderType[]}
            isPaginationEnabled={false}
            isCollumnVisibilityEnabled={false}
            isSearchEnabled={false}
          />
        </>
      )}
    </div>
  );
}
