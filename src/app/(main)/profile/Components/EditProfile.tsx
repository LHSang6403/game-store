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
import FormAddressPicker from "@components/Picker/Address/FormAddressPicker";
import { CustomCalendar } from "@components/Picker/Date/CustomCalendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { useState, useEffect } from "react";
import useAddressSelects from "@/zustand/useAddressSelects";
import { useSession } from "@/zustand/useSession";

import province from "@/static-data/provinces.json";
import district from "@/static-data/districts.json";
import communes from "@/static-data/communes.json";

const FormSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(2),
  dob: z.string().min(2),
  address: z.string().min(2),
  ward: z.string().min(2),
  district: z.string().min(2),
  province: z.string().min(2),
});

export default function EditProfile({
  profile,
}: {
  profile: CustomerType | StaffType;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useSession();

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
    mode: "onBlur",
  });

  const [date, setDate] = useState<Date>();
  const { addressValues, setCommune, setDistrict, setProvince } =
    useAddressSelects();

  // set default address and bidthday
  useEffect(() => {
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
          const updateResponse = await updateUserProfile({
            updatedUser: updatedUser,
            actor: { actorId: session.id, actorName: session.name },
          });

          ApiErrorHandlerClient({
            response: updateResponse,
            isShowToast: false,
          });
        }
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
        <Button variant="outline" className="h-8 border-none">
          Edit
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
                      <span className="text-muted-foreground">
                        Pick birthday
                      </span>
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