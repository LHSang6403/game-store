import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "@/app/auth/_components/SignIn";
import SignUp from "@/app/auth/_components/SignUp";

export default function AuthCardTabs() {
  return (
    <Tabs
      defaultValue="sign-in"
      className="w-full rounded-lg border border-gray-200 p-2 shadow-sm md:w-[650px]"
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
          <CardHeader className="sm:px-2">
            <CardTitle>
              <span className="bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-transparent">
                Đăng nhập
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SignIn />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sign-up">
        <Card>
          <CardHeader className="sm:px-2">
            <CardTitle>
              <span className="bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-transparent">
                Đăng ký
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SignUp />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
