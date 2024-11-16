import SignUp from "@/app/auth/_components/SignUp";
import { Card, CardHeader, CardContent } from "@components/ui/card";

export default async function page() {
  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-2 pb-2 md:pb-4">
      <h1 className="my-2 text-2xl font-medium">Tạo tài khoản</h1>
      <Card className="h-fit w-full">
        <CardHeader className="px-2 pb-3 md:px-0">
          Nhập thông tin tài khoản
        </CardHeader>
        <CardContent>
          <SignUp />
        </CardContent>
      </Card>
    </div>
  );
}
