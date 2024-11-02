import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Textarea } from "@components/ui/textarea";
import { Input } from "@components/ui/input";
import FormAddressPicker from "@components/Picker/Address/FormAddressPicker";
import SelectShipmentForm from "@/app/(main)/cart/_components/Summary/SelectShipmentForm";

export default function OrderFormInputs({ form }: { form: any }) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên</FormLabel>
            <FormControl>
              <Input
                placeholder="Tên khách hàng"
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
            <FormLabel>Điện thoại</FormLabel>
            <FormControl>
              <Input
                placeholder="Số liên hệ"
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
            <FormLabel>Tỉnh, huyện, phường</FormLabel>
            <FormControl>
              <FormAddressPicker />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ghi chú thêm</FormLabel>
            <FormControl>
              <Textarea
                className="max-h-44 min-h-28 border-[#E5E7EB]"
                placeholder="Ghi chú..."
                {...field}
                value={field.value ?? ""}
                onChange={field.onChange}
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
            <FormLabel>Địa chỉ</FormLabel>
            <FormControl>
              <Input
                placeholder="Số nhà, tên đường"
                {...field}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shipment"
        render={() => (
          <FormItem>
            <FormLabel>Dịch vụ giao hàng</FormLabel>
            <FormControl>
              <SelectShipmentForm
                onChange={(value) => {
                  form.setValue("shipment", value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
