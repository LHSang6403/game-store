import { readOrdersByCustomerId } from "@app/(main)/cart/_actions/order";
import { columns } from "@app/(main)/cart/Components/History/Columns";
import { DataTable } from "@components/Table/DataTable";
import type { OrderType } from "@utils/types";
import { readUserSession } from "@app/auth/_actions/users";

export default async function OrderHistory() {
  const sessionResponse = await readUserSession();
  if (!sessionResponse) return <div>You are not logged in.</div>;

  const hisrotyResponse = await readOrdersByCustomerId(
    sessionResponse.data?.id as string
  );
  // if (hisrotyResponse.error)
  //   throw new Error("Error while fetching order history.");

  return (
    <div className="w-fit mx-auto">
      {sessionResponse &&
        !hisrotyResponse.error &&
        "data" in hisrotyResponse && (
          <>
            <h2 className="text-lg font-semibold mb-1">Your history</h2>
            <DataTable
              columns={columns}
              data={hisrotyResponse.data as OrderType[]}
              isPaginationEnabled={false}
              isCollumnVisibilityEnabled={false}
              isSearchEnabled={false}
            />
          </>
        )}
    </div>
  );
}
