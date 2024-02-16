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
import { Textarea } from "@components/ui/textarea";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import Image from "next/image";

const FormSchema = z.object({
  name: z.string(),
  information: z.string(),
  review: z.string(),
});

export default function ProductReview() {
  return (
    <div className="w-[70%] h-fit mx-auto rounded-3xl bg-background flex flex-row gap-10 xl:gap-6 sm:gap-4 justify-center">
      <div className="w-fit h-full overflow-auto flex flex-col gap-6">
        <PersonReview />
        <PersonReview />
      </div>
      {/* <div className="w-1/2 xl:w-full"> */}
      <ReviewForm />
      {/* </div> */}
    </div>
  );
}

function PersonReview() {
  return (
    <div className="w-[500px] h-fit max-h-56 bg-background border border-foreground/20 flex flex-row justify-between rounded-md overflow-hidden relative">
      <div className="w-3/4 h-full py-4 px-6 flex flex-col justify-between">
        <p className="text-sm line-clamp-4 overflow-ellipsis text-foreground/90">
          The product is amazing! It exceeded my expectations in every way. The
          quality is top-notch and the design is sleek and modern. I would
          highly recommend it.
        </p>
        <div className="mt-4">
          <h2 className="text-xl font-medium -mb-1">Mr. Sam</h2>
          <p className="text-foreground/80 text-sm font-light">
            Living at Silicon Valley
          </p>
        </div>
      </div>
      <div className="h-40 absolute right-0 bottom-0">
        <Image
          alt="Category"
          src="/assets/images/people/male2.png"
          className="object-contain !w-full !relative sm:pt-4"
          layout="fill"
        />
      </div>
    </div>
  );
}

function ReviewForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      information: "",
      review: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast.success("Review submitted successfully.");
  }

  return (
    <div className="w-72 h-fit flex flex-col gap-2 border border-foreground/20 py-4 px-3 rounded-md">
      <h2 className="text-xl font-semibold text-center">Share your review</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
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
            name="information"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extra information</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your information"
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
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your review"
                    {...field}
                    type="text"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-foreground text-background"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
