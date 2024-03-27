import Image from "next/image";
import { readUserSession } from "@/app/_actions/user";
import OrderHistory from "@app/(main)/cart/Components/History/OrderHistory";
import Edit from "@app/(main)/profile/Components/Edit";
import Link from "next/link";
import { ApiErrorHandlerServer } from "@/utils/errorHandler/apiErrorHandler";

export default async function page() {
  const sessionResponse = await readUserSession();
  const session = ApiErrorHandlerServer<any>({
    response: sessionResponse,
  });

  if (!session.data || session.error)
    return (
      <div className="mt-10 flex flex-col items-center">
        <span className="text-xl font-medium">You are not logged in. </span>
        <Link
          className="text-base text-foreground/80 hover:text-foreground"
          href="/auth"
        >
          Login
        </Link>
      </div>
    );

  const dobDate = new Date(session?.data?.detailData?.dob.toString() ?? "");
  const day = dobDate.getDate();
  const month = dobDate.getMonth() + 1;
  const year = dobDate.getFullYear();
  const formattedDOB = `${day}/${month}/${year}`;

  return (
    <div className="flex flex-col gap-8 px-10 pb-10 xl:px-6 sm:px-4">
      <h1 className="text-center text-3xl font-semibold">Your profile</h1>
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex h-32 w-32 justify-center rounded-full border p-0.5">
          <Image
            src={
              session.data?.detailData?.image
                ? process.env.NEXT_PUBLIC_SUPABASE_URL +
                  "/storage/v1/object/public/public_files/" +
                  session.data.detailData.image
                : "https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-avatar-vector-icon-white-background-png-image_1870181.jpg"
            }
            alt="profile"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <Edit profile={session.data.detailData} />
        <div className="w-fit rounded-md">
          <p className="text-left">
            <span className="font-semibold">Name: </span>
            {session.data?.detailData?.name}
          </p>
          <p className="text-left">
            <span className="font-semibold">Email: </span>{" "}
            {session.data?.detailData?.email}
          </p>
          <p className="text-left">
            <span className="font-semibold">Birdthday: </span>{" "}
            {formattedDOB ?? "Unknown"}
          </p>
          <p className="text-left">
            <span className="font-semibold">Phone: </span>{" "}
            {session.data?.detailData?.phone ?? "Unknown"}
          </p>
          <p className="max-w-[500px] text-left">
            <span className="font-semibold">Address: </span>{" "}
            {session.data?.detailData?.address +
              ", " +
              session.data?.detailData?.ward +
              ", " +
              session.data?.detailData?.district +
              ", " +
              session.data?.detailData?.province ?? "Unknown"}
          </p>
          {"role" in session.data?.detailData ? (
            <p className="text-left">
              <span className="font-semibold">Role: </span>{" "}
              {session.data?.detailData.role}
            </p>
          ) : (
            <p className="text-left">
              <span className="font-semibold">Level: </span>{" "}
              {session.data?.detailData?.level}
            </p>
          )}
        </div>
      </div>
      <div className="mt-2">
        <OrderHistory />
      </div>
    </div>
  );
}
