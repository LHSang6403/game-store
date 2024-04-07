import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "@/app/auth/Components/SignIn";
import SignUp from "@/app/auth/Components/SignUp";

export default function AuthCardTabs() {
  return (
    <Tabs
      defaultValue="sign-in"
      className="w-[650px] rounded-lg border border-gray-200 p-2 shadow-sm sm:w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          className="rounded-md data-[state=active]:bg-foreground data-[state=active]:text-accent"
          value="sign-in"
        >
          Đăng nhập
        </TabsTrigger>
        <TabsTrigger
          className="rounded-md data-[state=active]:bg-foreground data-[state=active]:text-accent"
          value="sign-up"
        >
          Đăng ký
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <Card>
          <CardHeader>
            <CardTitle>Đăng nhập</CardTitle>
            <CardDescription>
              Tài khoản test: <br />
              lhsang6403@gmail.com (customer), <br />
              lhsang21@clc.fitus.edu.vn (customer), <br />
              gamestorevn2024@gmail.com (manager), <br />
              and password: 123456.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignIn />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sign-up">
        <Card>
          <CardHeader>
            <CardTitle>Đăng ký</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUp />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
