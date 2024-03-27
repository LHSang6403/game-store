import { readOrdersByCustomerId } from "@/app/_actions/order";
import { columns } from "@app/(main)/cart/Components/History/Columns";
import { DataTable } from "@components/Table/DataTable";
import type { OrderType } from "@utils/types";
import { readUserSession } from "@/app/_actions/user";
import { ApiErrorHandlerServer } from "@/utils/errorHandler/apiErrorHandler";

export default async function OrderHistory() {
  const sessionResponse = await readUserSession();
  const session = ApiErrorHandlerServer<any>({
    response: sessionResponse,
  });

  const historyResponse = await readOrdersByCustomerId(
    session.data?.data?.session?.user?.id
  );
  const history = ApiErrorHandlerServer<OrderType[]>({
    response: historyResponse,
  });

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
