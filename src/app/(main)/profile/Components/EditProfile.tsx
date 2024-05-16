"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import FormAddressPicker from "@components/Picker/Address/FormAddressPicker";
import { CustomCalendar } from "@components/Picker/Date/CustomCalendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { useState, useEffect } from "react";
import useAddressSelects from "@/zustand/useAddressSelects";
import { useSession, SessionState } from "@/zustand/useSession";
import formatVNDate from "@/utils/functions/formatVNDate";

import province from "@/static-data/provinces.json";
import district from "@/static-data/districts.json";
import communes from "@/static-data/communes.json";

const FormSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập tên của bạn."),
  phone: z.string().min(2, "Vui lòng nhập số điện thoại."),
  dob: z.string().min(2, "Vui lòng nhập ngày sinh."),
  address: z.string().min(2, "Vui lòng nhập địa chỉ của bạn."),
  ward: z.string().min(2, "Vui lòng nhập phường/xã."),
  district: z.string().min(2, "Vui lòng nhập quận/huyện."),
  province: z.string().min(2, "Vui lòng nhập tỉnh/thành phố."),
});

export default function EditProfile({
  profile,
}: {
  profile: CustomerType | StaffType;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useSession() as SessionState;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: profile.name,
      phone: profile.phone,
      dob: profile.dob,
      address: profile.address,
      ward: profile.ward,
      district: profile.district,
      province: profile.province,
    },
    mode: "onChange",
  });

  const [date, setDate] = useState<Date>();
  const { addressValues, setCommune, setDistrict, setProvince } =
    useAddressSelects();

  // set default address and bidthday
  useEffect(() => {
    if (
      profile.dob &&
      profile.address &&
      profile.ward &&
      profile.district &&
      profile.province
    ) {
      setDate(new Date(profile.dob));

      const provinceId =
        province.find((province) => province.name === profile.province)
          ?.idProvince ?? "";

      setProvince(profile.province, provinceId);

      const districtId =
        district.find((district) => district.name === profile.district)
          ?.idDistrict ?? "";

      setDistrict(profile.district, districtId);

      const communeId =
        communes.find((commune) => commune.name === profile.ward)?.idCommune ??
        "";

      setCommune(profile.ward, communeId);
    }
  }, []);

  // update address
  useEffect(() => {
    if (addressValues) {
      form.setValue("province", addressValues.province);
      form.setValue("district", addressValues.district);
      form.setValue("ward", addressValues.commune);
    }
    form.trigger("ward");
  }, [addressValues]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    toast.promise(
      async () => {
        let updatedUser = { ...profile };
        updatedUser.name = data.name;
        updatedUser.phone = data.phone;
        updatedUser.dob = data.dob;
        updatedUser.address = data.address;
        updatedUser.ward = data.ward;
        updatedUser.district = data.district;
        updatedUser.province = data.province;

        if (session) {
          const result = await updateUserProfile({
            updatedUser: updatedUser,
            actor: { actorId: session.id, actorName: session.name },
          });

          if (result.error) throw new Error(result.error);
        }
      },
      {
        loading: "Đang cập nhật...",
        success: () => {
          form.reset();
          setIsOpen(false);
          return "Cập nhật thông tin thành công!";
        },
        error: () => {
          return "Đã có lỗi xảy ra. Vui lòng thử lại.";
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 border-none">
          Chỉnh sửa
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md pb-0 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin tài khoản</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên người dùng</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tên"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Số điện thoại"
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
            <FormItem>
              <FormLabel>Ngày sinh</FormLabel>
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
                      formatVNDate(date)
                    ) : (
                      <span className="text-muted-foreground">Chọn ngày</span>
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ nhà</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Địa chỉ"
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
              Lưu thay đổi
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
