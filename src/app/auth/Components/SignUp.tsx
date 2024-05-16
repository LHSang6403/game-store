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
import { signUpWithEmailAndPassword } from "@auth/_actions/signUp";
import FormAddressPicker from "@components/Picker/Address/FormAddressPicker";
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
import { Input } from "@/components/ui/input";
import formatVNDate from "@/utils/functions/formatVNDate";

const FormSchema = z
  .object({
    name: z.string().min(1, { message: "Vui lòng nhập tên." }),
    phone: z
      .string()
      .min(6)
      .max(12)
      .refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Số điện thoại không hợp lệ.",
      }),
    dob: z.string().min(2, { message: "Vui lòng nhập ngày sinh." }),
    address: z.string().min(2, { message: "Vui lòng nhập địa chỉ." }),
    ward: z.string().min(2, { message: "Vui lòng nhập phường/xã." }),
    district: z.string().min(2, { message: "Vui lòng nhập quận/huyện." }),
    province: z.string().min(2, { message: "Vui lòng nhập tỉnh/thành phố." }),
    email: z.string().email("Email không đúng định dạng."),
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
    mode: "onChange",
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

        if (result.error) throw new Error("Tạo tài khoản thất bại.");

        if (result.data?.user?.id) {
          const uploadAvatarResult = await updaloadAvatar({
            userId: result.data?.user?.id,
            file: files[0],
          });

          const avatarUrl = uploadAvatarResult.data?.path;
          if (!avatarUrl) throw new Error("Thêm ảnh thất bại.");

          await updateUserImage({
            id: result.data?.user?.id,
            table: "customer",
            newImage: avatarUrl,
          });
        }
      },
      {
        loading: "Đang tạo tài khoản...",
        success: () => {
          form.reset();
          clearAll();
          clearFiles();
          setDate(undefined);

          return "Tạo tài khoản thành công. Vui lòng xác nhận email.";
        },
        error: (error: any) => {
          return error.message;
        },
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
              <FormLabel>Họ tên</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập họ tên"
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
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập số"
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
        <FormItem>
          <FormLabel>Ngày sinh</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start border text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  formatVNDate(date)
                ) : (
                  <span className="text-muted-foreground">Chọn ngày sinh</span>
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
                      const dateObject = new Date(value.toString());
                      const isoDateString = dateObject.toISOString();

                      form.setValue("dob", isoDateString);
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
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập địa chỉ"
                  {...field}
                  type="text"
                  onChange={field.onChange}
                  className=""
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
              <FormLabel>Khu vực</FormLabel>
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
              <FormLabel>Mật khẩu</FormLabel>
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
              <FormLabel>Xác nhận mật khẩu</FormLabel>
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
          <FormLabel>Hình đại diện</FormLabel>
          <DropAndDragZone
            className="mt-2 rounded-lg border p-16 sm:p-6"
            maxFiles={1}
          />
        </div>
        <div className="col-span-2 -mt-4 flex items-center justify-center">
          <Button
            disabled={!form.formState.isValid}
            type="submit"
            className="w-36 bg-foreground text-background sm:w-full"
          >
            Tạo tài khoản
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
