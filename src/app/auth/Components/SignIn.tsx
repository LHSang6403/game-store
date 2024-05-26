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
import { readUserSession } from "@/app/_actions/user";
import { useSession, SessionState } from "@/zustand/useSession";
import GoogleOAuth from "@/app/OAuth/GoogleOAuth";

const FormSchema = z.object({
  email: z.string().email("Email không hợp lệ."),
  password: z.string().min(6, {
    message: "Mật khẩu phải dài hơn 6 ký tự.",
  }),
});

export default function SignIn() {
  const router = useRouter();
  const { setSession } = useSession() as SessionState;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        const result = await signInWithEmailAndPassword(data);

        if (result.error) {
          if (typeof result.error === "string") {
            throw new Error(result.error);
          } else {
            throw new Error("Đăng nhập thất bại.");
          }
        }

        const session = await readUserSession();

        if (
          session.data &&
          "detailData" in session.data &&
          session.data.detailData
        ) {
          setSession(session.data.detailData);
        } else {
          throw new Error("Đăng nhập thất bại");
        }
      },
      {
        loading: "Đang đăng nhập...",
        success: () => {
          form.reset();
          router.push("/");

          return "Đăng nhập thành công!";
        },
        error: (error: any) => {
          return error.message;
        },
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
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mật khẩu"
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
              type="button"
              onClick={() => {
                router.push("/auth/forget-password");
              }}
              className="mt-1 w-full bg-background text-foreground hover:border hover:bg-background"
            >
              Quên mật khẩu
            </Button>
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className="mt-1 w-full bg-gradient-to-r from-cpurple via-cpink to-corange text-background"
            >
              Đăng nhập
            </Button>
          </div>
        </form>
      </Form>
      <GoogleOAuth />
    </div>
  );
}
