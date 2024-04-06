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
import SelectShipmentForm from "@app/(main)/cart/Components/Summary/SelectShipmentForm";

export default function CreateFormInputs({ form }: { form: any }) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên khách hàng</FormLabel>
            <FormControl>
              <Input
                placeholder="Nhập tên"
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
                placeholder="Nhập số nhà, tên đường"
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
      <FormField
        control={form.control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ghi chú thêm</FormLabel>
            <FormControl>
              <Textarea
                className="max-h-44 min-h-28 border-[#E5E7EB]"
                placeholder="Ghi chú cho đơn hàng của bạn..."
                {...field}
                value={field.value ?? ""}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
