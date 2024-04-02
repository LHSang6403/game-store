import SignUp from "@/app/auth/Components/SignUp";
import { Card, CardHeader, CardContent } from "@components/ui/card";

export default async function page() {
  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-2 pb-6">
      <h1 className="my-2 text-2xl font-medium">Tạo tài khoản</h1>
      <Card className="h-fit w-full">
        <CardHeader className="pb-3">Nhập thông tin tài khoản</CardHeader>
        <CardContent>
          <SignUp />
        </CardContent>
      </Card>
    </div>
  );
}
