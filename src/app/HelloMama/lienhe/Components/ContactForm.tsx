"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../Shadcn/Input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../Shadcn/Button";

const FormSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(5).max(11),
  message: z.string().nullable(),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {}

  return (
    <div className="w-[550px] rounded-md bg-[#E7F2F8] px-3 py-6 sm:w-full">
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center rounded-lg">
                <FormControl>
                  <Input
                    className="h-8 border-none bg-white"
                    placeholder="Địa chỉ email"
                    {...field}
                    type="text"
                    onChange={field.onChange}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center rounded-lg">
                <FormControl>
                  <Input
                    className="h-8 border-none bg-white"
                    placeholder="Số điện thoại"
                    {...field}
                    type="text"
                    onChange={field.onChange}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="h-44 resize-none border-none bg-white"
                    {...field}
                    value={field.value ?? undefined}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />
          <Button
            className="group mx-auto flex w-fit flex-row gap-1 px-16"
            type="submit"
          >
            <span className="bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-lg font-light text-transparent group-hover:text-white">
              Gửi
            </span>
            <Image
              src="/assets/images/HelloMama/send_icon.png"
              alt="Send"
              width={15}
              height={15}
            />
          </Button>
        </form>
      </Form>
    </div>
  );
}
