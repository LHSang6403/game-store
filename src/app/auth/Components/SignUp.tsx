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
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { signUpWithEmailAndPassword } from "@auth/_actions/signUp";
import FormAddressPicker from "@components/Picker/Address/FormAddressPicker";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomCalendar } from "@components/Picker/Date/CustomCalendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { useState, useEffect } from "react";
import useAddressSelects from "@/zustand/useAddressSelects";
import DropAndDragZone from "@components/File/DropAndDragZone";
import useFiles from "@/zustand/useFiles";
import createSupabaseBrowserClient from "@/supabase-query/client";
import { updateUserImage } from "@app/_actions/user";

const FormSchema = z
  .object({
    name: z.string().min(1, { message: "Name is a compulsory." }),
    phone: z
      .string()
      .min(6, { message: "Must be a valid mobile number" })
      .max(12, { message: "Must be a valid mobile number" })
      .refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string",
      }),
    dob: z.string().min(2, { message: "Birthday is a compulsory." }),
    address: z.string().min(2, { message: "Address is a compulsory." }),
    ward: z.string().min(2, { message: "Ward is a compulsory." }),
    district: z.string().min(2, { message: "District is a compulsory." }),
    province: z.string().min(2, { message: "Province is a compulsory." }),
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be greater than 5 letters.",
    }),
    confirm: z.string().min(6, {
      message: "Password must be greater than 5 letters.",
    }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Password did not match",
    path: ["confirm"],
  });

export default function SignUp() {
  const { files, clearFiles } = useFiles();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      phone: "",
      dob: "",
      address: "",
      ward: "",
      district: "",
      province: "",
      email: "",
      password: "",
      confirm: "",
    },
    mode: "onBlur",
  });

  const [date, setDate] = useState<Date>();
  const { addressValues, clearAll } = useAddressSelects();

  useEffect(() => {
    if (addressValues) {
      form.setValue("province", addressValues.province);
      form.setValue("district", addressValues.district);
      form.setValue("ward", addressValues.commune);
    }
    form.trigger("ward");
  }, [addressValues]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        const result = await signUpWithEmailAndPassword({
          name: data.name,
          phone: data.phone,
          dob: data.dob,
          address: data.address,
          ward: data.ward,
          district: data.district,
          province: data.province,
          email: data.email,
          password: data.password,
        });

        if (result.data?.user?.id) {
          const uploadAvatarResult = await updaloadAvatar({
            userId: result.data?.user?.id,
            file: files[0],
          });

          const avatarUrl = uploadAvatarResult.data?.path;

          if (avatarUrl) {
            const updateUserImageResult = await updateUserImage({
              id: result.data?.user?.id,
              table: "customer",
              newImage: avatarUrl,
            });

          }
        }

        if (result.error) {
          if (typeof result.error === "string") {
            toast.error(result.error);
          } else {
            toast.error(result.error.message);
          }
        } else {
          form.reset();

          clearAll();
          clearFiles();
          setDate(undefined);

          toast.success("User created successfully. Confirm your email.");
        }
      },
      {
        loading: "Creating account...",
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid h-fit w-full grid-cols-2 gap-4 sm:flex sm:w-full sm:flex-col"
      >
        <FormField
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormItem>
          <FormLabel>Birthday</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span className="text-muted-foreground">Pick birthday</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CustomCalendar
                mode="single"
                captionLayout="dropdown-buttons"
                selected={date}
                onSelect={(value) => {
                  {
                    setDate(value);
                    if (value) {
                      form.setValue("dob", value.toString());
                    }
                  }
                }}
                fromYear={1960}
                toYear={2030}
              />
            </PopoverContent>
          </Popover>
        </FormItem>
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={() => (
            <FormItem>
              <FormLabel>Your local</FormLabel>
              <FormControl>
                <FormAddressPicker />
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
                  placeholder="Password"
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
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
          <FormLabel>Avatar</FormLabel>
          <DropAndDragZone
            className="mt-2 rounded-lg border p-16 sm:p-6"
            maxFiles={1}
          />
        </div>
        <div className="col-span-2">
          <Button
            disabled={!form.formState.isValid}
            type="submit"
            className="mt-1 w-full bg-foreground text-background"
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
}

async function updaloadAvatar({
  userId,
  file,
}: {
  userId: string;
  file: File;
}) {
  const supabase = createSupabaseBrowserClient();
  const result = await supabase.storage
    .from("public_files")
    .upload("/user_images/" + userId, file, {
      upsert: true,
      duplex: "half",
    });

  return result;
}
