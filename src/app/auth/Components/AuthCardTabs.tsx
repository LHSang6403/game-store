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
      className="w-[550px] rounded-lg border border-gray-200 p-2 shadow-sm sm:w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          className="rounded-md data-[state=active]:bg-foreground data-[state=active]:text-accent"
          value="sign-in"
        >
          Sign In
        </TabsTrigger>
        <TabsTrigger
          className="rounded-md data-[state=active]:bg-foreground data-[state=active]:text-accent"
          value="sign-up"
        >
          Sign Up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <Card>
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>
              Use account: <br />
              lhsang6403@gmail.com (customer), <br />
              lhsang21@clc.fitus.edu.vn (customer), <br />
              gamestorevn2024@gmail.com (admin), <br />
              and password: 123456, and click Sign In.
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
            <CardTitle>Register</CardTitle>
            {/* <CardDescription>
              Create your account information, we will use this to verify users.
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <SignUp />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
