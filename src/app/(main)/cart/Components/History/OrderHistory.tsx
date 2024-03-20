import { readOrdersByCustomerId } from "@/app/_actions/order";
import { columns } from "@app/(main)/cart/Components/History/Columns";
import { DataTable } from "@components/Table/DataTable";
import type { OrderType } from "@utils/types";
import { readUserSession } from "@/app/_actions/user";
import { ApiErrorHandlerServer } from "@/utils/errorHandler/apiErrorHandler";

export default async function OrderHistory() {
  const unprocessedSessionResponse = await readUserSession();
  const sessionResponse = ApiErrorHandlerServer<any>({
    response: unprocessedSessionResponse,
  });

  const unprocessedHistoryResponse = await readOrdersByCustomerId(
    sessionResponse.data?.data?.session?.user?.id
  );
  const historyResponse = ApiErrorHandlerServer<OrderType[]>({
    response: unprocessedHistoryResponse,
  });

  return (
    <div className="mx-auto w-fit xl:w-auto">
      {sessionResponse.data &&
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
