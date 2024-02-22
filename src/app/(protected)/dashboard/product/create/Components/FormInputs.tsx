"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function FormInputs({ form }: { form: any }) {
  return (
    <div className="grid h-fit w-full grid-cols-2 gap-4 sm:flex sm:w-full sm:flex-col">
      <FormField
        control={form.control}
        name="brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand</FormLabel>
            <FormControl>
              <Input
                placeholder="Product's brand"
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
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Product's name"
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
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Product's description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="options"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Options</FormLabel>
            <FormControl>
              <Input
                placeholder="Options (comma-separated)"
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
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                placeholder="Product's price (VND)"
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
        name="rate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rate</FormLabel>
            <FormControl>
              <Input
                placeholder="Product's rate"
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
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Input
                placeholder="Product's category"
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
        name="storage_address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Storage Address</FormLabel>
            <FormControl>
              <Input
                placeholder="Address of storage"
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
        name="storage_quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Storage Quantity</FormLabel>
            <FormControl>
              <Input
                placeholder="Product's quantity"
                {...field}
                type="text"
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
