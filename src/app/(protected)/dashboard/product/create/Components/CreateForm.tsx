"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { toast } from "sonner";
import { Form } from "@components/ui/form";
import { Button } from "@components/ui/button";
// import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";
import DropAndDragZone from "@/components/File/DropAndDragZone";
import FormInputs from "./FormInputs";
// import useFormPersist from "react-hook-form-persist";
import useFiles from "@/zustand/useFiles";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
// import type { ProductType } from "@/utils/types";

const FormSchema = z.object({
  brand: z.string().min(1, { message: "Brand is a compulsory." }),
  name: z.string().min(1, { message: "Name is a compulsory." }),
  description: z.string().min(1, { message: "Description is a compulsory." }),
  images: z.array(z.string()),
  price: z.number().min(0, { message: "Price must be a positive number." }),
  options: z.array(z.string()),
  rate: z.number().min(0, { message: "Rate must be a positive number." }),
  sold_quantity: z
    .number()
    .min(0, { message: "Sold quantity must be a positive number." }),
  description_id: z.string(),
  category: z.string(),
  is_deleted: z.boolean(),
});

export default function CreateForm() {
  // const router = useRouter();
  const { files } = useFiles();

  const [content, setContent] = useLocalStorage("create-product-form", {
    brand: "",
    name: "",
    description: "",
    images: [""],
    price: Number(1000000),
    options: [""],
    rate: Number(4),
    sold_quantity: Number(0),
    description_id: "",
    category: "",
    is_deleted: false,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: content ?? {
      brand: "",
      name: "",
      description: "",
      images: [],
      price: Number(1000000),
      options: [],
      rate: Number(4),
      sold_quantity: Number(0),
      description_id: "",
      category: "",
      is_deleted: false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("---form", data);

    const descriptionLocalData = window.localStorage.getItem("content");
    const descriptionLocalDataJson = descriptionLocalData
      ? JSON.parse(descriptionLocalData)
      : {};

    console.log(
      "---description:",
      descriptionLocalDataJson.content[0].content[0].text
    );

    console.log("---files", files);

    // upload description -> id
    // upload images -> urls
    // create product

    // form.reset();
    // if (false) {
    // } else {
    //   toast.success("Created successfully.");
    // //   router.push("/");
    // }
  }

  useEffect(() => {
    const formValues = form.getValues();
    setContent(formValues);
  }, [form.watch(), setContent]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="h-fit w-full xl:col-span-2">
          <FormInputs form={form} />
        </div>
        <div className="flex h-fit w-full flex-col xl:col-span-2 xl:mt-5">
          <h2 className="title mb-1 ml-1 text-xl font-semibold">
            Product images
          </h2>
          <DropAndDragZone className="rounded-lg border p-16 sm:p-6" />
        </div>
        <div className="col-span-2">
          <h2 className="title mb-1 ml-1 text-xl font-semibold">Description</h2>
          <div className="h-fit overflow-hidden rounded-md border">
            <Editor />
          </div>
        </div>
        <div className="col-span-2 flex justify-center">
          <Button className="mt-1 w-fit bg-foreground px-7 text-background">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
