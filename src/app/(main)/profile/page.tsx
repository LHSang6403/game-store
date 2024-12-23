import Image from "next/image";
import { readUserSession } from "@/app/_actions/user";
import OrderHistory from "@/app/(main)/cart/_components/History/OrderHistory";
import EditProfile from "@/app/(main)/profile/_components/EditProfile";
import Link from "next/link";

export default async function page() {
  const session = await readUserSession();

  if (!session.data || session.error)
    return (
      <div className="mt-10 flex flex-col items-center">
        <span className="bg-gradient-to-r from-cpurple via-cpink to-corange bg-clip-text text-xl font-medium text-transparent">
          Bạn chưa đăng nhập.
        </span>
        <Link
          className="text-sm text-foreground/80 hover:text-foreground"
          href="/auth"
        >
          Đăng nhập ngay
        </Link>
      </div>
    );

  const birthday = session?.data?.detailData?.dob;
  const dobDate = new Date(birthday?.toString() ?? "");
  const day = dobDate.getDate();
  const month = dobDate.getMonth() + 1;
  const year = dobDate.getFullYear();
  const formattedDOB = `${day}/${month}/${year}`;

  const province = session.data?.detailData?.province;
  const district = session.data?.detailData?.district;
  const ward = session.data?.detailData?.ward;
  const address = session.data?.detailData?.address;

  return (
    <div className="flex flex-col items-center gap-8 px-4 pb-10 md:px-6 xl:px-10">
      <h1 className="mt-6">
        <span className="bg-gradient-to-r from-cpurple via-cpink to-corange bg-clip-text text-center text-3xl font-semibold text-transparent">
          Thông tin tài khoản
        </span>
      </h1>
      <div className="flex w-full flex-col items-center gap-2">
        <div className="h-fit w-fit rounded-full bg-gradient-to-r from-cblue to-cpurple p-0.5">
          <div className="flex h-28 w-28 justify-center overflow-hidden rounded-full">
            <Image
              src={
                process.env.NEXT_PUBLIC_SUPABASE_BUCKET_PATH +
                (session.data?.detailData?.image ?? "")
              }
              alt="profile"
              width={150}
              height={150}
            />
          </div>
        </div>
        <EditProfile profile={session.data.detailData} />
        <div className="w-fit rounded-md">
          <p className="text-left">
            <span className="font-semibold">Tên người dùng: </span>
            {session.data?.detailData?.name ?? "Chưa có thông tin"}
          </p>
          <p className="text-left">
            <span className="font-semibold">Email: </span>{" "}
            {session.data?.detailData?.email ?? "Chưa có thông tin"}
          </p>
          <p className="text-left">
            <span className="font-semibold">Ngày sinh: </span>{" "}
            {birthday ? formattedDOB : "Chưa có thông tin"}
          </p>
          <p className="text-left">
            <span className="font-semibold">Số điện thoại: </span>{" "}
            {session.data?.detailData?.phone ?? "Chưa có thông tin"}
          </p>
          <p className="max-w-[500px] text-left">
            <span className="font-semibold">Địa chỉ: </span>{" "}
            {ward && district && address
              ? `${ward}, ${district}, ${address}, ${province}`
              : "Chưa có thông tin"}
          </p>
          {"role" in session.data?.detailData ? (
            <p className="text-left">
              <span className="font-semibold">Vai trò: </span>{" "}
              {session.data?.detailData.role ?? "Chưa có thông tin"}
            </p>
          ) : (
            <p className="text-left">
              <span className="font-semibold">Điểm: </span>{" "}
              {session.data?.detailData?.level ?? "Chưa có thông tin"}
            </p>
          )}
        </div>
      </div>
      <div className="mt-2 w-full">
        <OrderHistory />
      </div>
    </div>
  );
}
