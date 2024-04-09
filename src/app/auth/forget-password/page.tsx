"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Button } from "@components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Template from "@/app/(main)/template";
import Link from "next/link";
import createSupabaseBrowserClient from "@/supabase-query/client";

const FormSchema = z.object({
  email: z.string().email("Email không hợp lệ."),
});

export default function SignUp() {
  const supabase = createSupabaseBrowserClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        const result = await supabase.auth.resetPasswordForEmail(data.email, {
          redirectTo: `${window.location.href}/reset-password`,
        });

        if (result.error) {
          throw result.error;
        }
      },
      {
        error: "Đã có lỗi xảy ra, vui lòng thử lại sau.",
        loading: "Đang tải...",
        success: "Chúng tôi đã gửi một email để cập nhật mật khẩu của bạn.",
      }
    );
  }

  return (
    <Template>
      <div className="flex min-h-screen w-full items-center justify-center py-6 sm:pb-16 sm:pt-10">
        <Card>
          <CardHeader>
            <Link
              href="/auth"
              className="group flex w-full items-center rounded-md bg-btn-background pt-2 text-sm text-foreground no-underline hover:bg-btn-background-hover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Trở về
            </Link>
            <h1 className="text-center text-lg font-semibold">Quên mật khẩu</h1>
          </CardHeader>
          <CardContent className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="h-fit w-80"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email của bạn</FormLabel>
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
                <div className="mt-4">
                  <Button
                    disabled={!form.formState.isValid}
                    type="submit"
                    className="mt-1 w-full bg-foreground text-background"
                  >
                    Cập nhật mật khẩu
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Template>
  );
}
