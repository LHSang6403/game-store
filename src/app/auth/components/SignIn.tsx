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
} from "@components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { signInWithEmailAndPassword } from "@auth/_actions/signIn";
// import GoogleOAuthForm from "../OAuth/GoogleOAuth";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export default function SignIn() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await signInWithEmailAndPassword(data);
    const resultJson = JSON.parse(result);

    if (resultJson?.data?.session) {
      toast.success("Sign in successfully.");
      router.push("/");
    } else if (resultJson?.error?.message) {
      toast.error(resultJson.error.message);
    } else {
      router.push("/");
    }
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
          <div className="w-full flex flex-row gap-3">
            <Button
              type="submit"
              className="w-full text-foreground hover:text-accent bg-background"
            >
              Forget Password
            </Button>
            <Button
              type="submit"
              className="w-full bg-foreground text-background"
            >
              Sign In
            </Button>
          </div>
        </form>
      </Form>
      {/* <GoogleOAuthForm /> */}
    </div>
  );
}
