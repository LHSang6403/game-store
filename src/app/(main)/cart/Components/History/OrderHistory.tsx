import { readOrdersByCustomerId } from "@/app/_actions/order";
import { columns } from "@app/(main)/cart/Components/History/Columns";
import { DataTable } from "@components/Table/DataTable";
import type { OrderType } from "@utils/types";
import { readUserSession } from "@/app/_actions/user";

export default async function OrderHistory() {
  const sessionResponse = await readUserSession();
  if (!sessionResponse) return <div>You are not logged in.</div>;

  const historyResponse = await readOrdersByCustomerId(
    sessionResponse.data?.id as string
  );

  return (
    <div className="mx-auto w-fit xl:w-auto">
      {sessionResponse &&
        !historyResponse.error &&
        "data" in historyResponse && (
          <>
            <h2 className="mb-1 text-lg font-semibold">Your history</h2>
            <DataTable
              columns={columns}
              data={historyResponse.data as OrderType[]}
              isPaginationEnabled={false}
              isCollumnVisibilityEnabled={false}
              isSearchEnabled={false}
            />
          </>
        )}
    </div>
  );
}
