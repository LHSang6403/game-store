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
import Template from "@/app/(main)/template";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import createSupabaseBrowserClient from "@/supabase-query/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const FormSchema = z
  .object({
    password: z.string().min(6, {
      message: "Vui lòng nhập mật khẩu dài hơn 6 kí tự.",
    }),
    confirm: z.string().min(6, {
      message: "Vui lòng nhập mật khẩu dài hơn 6 kí tự.",
    }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Mật khẩu không trùng khớp.",
    path: ["confirm"],
  });

export default function page() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      toast.promise(
        async () => {
          await supabase.auth.updateUser({
            password: data.password,
          });
        },
        {
          error: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
          loading: "Đang lưu mật khẩu mới...",
          success: () => {
            router.push("/auth");
            return "Cập nhật mật khẩu thành công. Vui lòng đăng nhập lại.";
          },
        }
      );
    },
    [supabase, router]
  );

  return (
    <Template>
      <div className="center min-h-screen w-full pb-16 pt-10 md:py-6">
        <Card>
          <CardHeader>
            <Link
              href="/auth/forget-password"
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
            <h1 className="text-center text-lg font-semibold">
              Cập nhật mật khẩu
            </h1>
          </CardHeader>
          <CardContent className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex h-fit w-80 flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập mật khẩu"
                          {...field}
                          type="password"
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập mật khẩu"
                          {...field}
                          type="password"
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="col-span-2">
                  <Button
                    disabled={!form.formState.isValid}
                    type="submit"
                    className="mt-1 w-full bg-gradient-to-r from-cpurple via-cpink to-corange text-background"
                  >
                    Cập nhật
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
