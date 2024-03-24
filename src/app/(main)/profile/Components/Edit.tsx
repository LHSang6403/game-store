"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CustomerType, StaffType } from "@/utils/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateUserProfile } from "@app/_actions/user";
import { toast } from "sonner";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";
import { useState } from "react";

export interface UpdatingData {
  //   name: string;
  phone: string;
  address: string;
}

const schema = z.object({
  //   name: z.string().min(2).max(50),
  phone: z.string().min(2).max(12),
  address: z.string().min(2).max(100),
});

export default function Edit({
  profile,
}: {
  profile: CustomerType | StaffType;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      //   name: profile.name,
      phone: profile.phone,
      address: profile.address,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: UpdatingData) => {
    toast.promise(
      async () => {
        const unprocessedResult = await updateUserProfile<UpdatingData>({
          id: profile.id,
          role: "role" in profile ? "Staff" : "Customer",
          updatingData: data,
        });

        const result = ApiErrorHandlerClient({
          response: unprocessedResult,
          isShowToast: false,
        });
      },
      {
        loading: "Updating profile...",
        success: () => {
          form.reset();
          setIsOpen(false);
          return "Profile updated successfully!";
        },
        error: (error) => {
          return `Error: ${error.message ?? "Internal Server"}`;
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-none">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md pb-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 py-4"
          >
            {/* <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      type="text"
                      onChange={field.onChange}
                      className="border-[#E5E7EB]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your phone number"
                      {...field}
                      type="text"
                      onChange={field.onChange}
                      className="border-[#E5E7EB]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your address"
                      {...field}
                      type="text"
                      onChange={field.onChange}
                      className="border-[#E5E7EB]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mx-auto mt-2 w-fit bg-foreground px-7 text-background"
            >
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
