"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInWithEmailAndPassword } from "@auth/_actions/signIn";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";
import { readUserSession } from "@/app/_actions/user";
import { useSession } from "@/zustand/useSession";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be greater than 5 letters.",
  }),
});

export default function SignIn() {
  const router = useRouter();
  const { setSession } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        const result = await signInWithEmailAndPassword(data);

        if (result.error) {
          if (typeof result.error === "string") {
            toast.error(result.error);
          } else {
            toast.error(result.error.message);
          }
        } else {
          const sessionResponse = await readUserSession();
          const session = ApiErrorHandlerClient<any>({
            response: sessionResponse,
            isShowToast: false,
          });

          if (
            session.data &&
            "detailData" in session.data &&
            session.data.detailData
          ) {
            setSession(session.data.detailData);

            form.reset();
            router.push("/");

            toast.success("Signed in successfully.");
          } else {
            toast.error("Failed to sign in.");
          }
        }
      },
      {
        loading: "Signing account...",
      }
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    type="email"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    {...field}
                    type="password"
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-row gap-3">
            <Button
              type="submit"
              className="mt-1 w-full bg-background text-foreground hover:text-accent"
            >
              Forget Password
            </Button>
            <Button
              type="submit"
              className="mt-1 w-full bg-foreground text-background"
            >
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
