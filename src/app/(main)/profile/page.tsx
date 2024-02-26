import Image from "next/image";
import { readUserSession } from "@/app/_actions/user";
import OrderHistory from "@app/(main)/cart/Components/History/OrderHistory";
import Edit from "@app/(main)/profile/Components/Edit";
import Link from "next/link";

export default async function page() {
  const session = await readUserSession();

  if (!session || session.error || !("detailData" in session))
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

  return (
    <div className="flex flex-col gap-8 px-10 pb-10">
      <h1 className="text-center text-3xl font-semibold">Your profile</h1>
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex justify-center rounded-full border p-0.5">
          <Image
            src={
              session.detailData?.image ??
              "https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-avatar-vector-icon-white-background-png-image_1870181.jpg"
            }
            alt="profile"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        <Edit profile={session.detailData} />
        <div className="w-fit rounded-md">
          <p className="text-left">
            <span className="font-semibold">Name: </span>
            {session.detailData.name}
          </p>
          <p className="text-left">
            <span className="font-semibold">Email: </span>{" "}
            {session.detailData.email}
          </p>
          <p className="text-left">
            <span className="font-semibold">Birdthday: </span>{" "}
            {session.detailData.dob ?? "Unknown"}
          </p>
          <p className="text-left">
            <span className="font-semibold">Phone: </span>{" "}
            {session.detailData.phone ?? "Unknown"}
          </p>
          <p className="text-left">
            <span className="font-semibold">Address: </span>{" "}
            {session.detailData.address ?? "Unknown"}
          </p>
          {"role" in session.detailData ? (
            <p className="text-left">
              <span className="font-semibold">Role: </span>{" "}
              {session.detailData.role}
            </p>
          ) : (
            <p className="text-left">
              <span className="font-semibold">Level: </span>{" "}
              {session.detailData.level}
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
