"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Form } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";
import DropAndDragZone from "@/components/File/DropAndDragZone";
import FormInputs from "./FormInputs";
import useFiles from "@/zustand/useFiles";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSession } from "@/zustand/useSession";
import { v4 as uuidv4 } from "uuid";
import createSupabaseBrowserClient from "@/supabase/client";
import { createProduct } from "@app/_actions/product";
import { createStorage } from "@app/_actions/storage";
import { createProductDescription } from "@app/_actions/product_description";
import type {
  ProductType,
  ProductDescriptionType,
  StorageType,
} from "@/utils/types";

const FormSchema = z.object({
  brand: z.string().min(1, { message: "Brand is a compulsory." }),
  name: z.string().min(1, { message: "Name is a compulsory." }),
  description: z.string().min(1, { message: "Description is a compulsory." }),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  options: z.string(),
  rate: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  sold_quantity: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  category: z.string(),
  storage_address: z.string(),
  storage_quantity: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
});

export default function CreateForm() {
  // const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession();

  const [content, setContent] = useLocalStorage("create-product-form", {
    brand: "",
    name: "",
    description: "",
    price: "1000000",
    options: "", // make list options
    rate: "4",
    sold_quantity: "0",
    category: "",
    storage_address: "",
    storage_quantity: "0",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: content ?? {
      brand: "",
      name: "",
      description: "",
      price: "1000000",
      options: "", // make list options
      rate: "4",
      sold_quantity: "0",
      category: "",
      storage_address: "",
      storage_quantity: "0",
    },
  });
  const { watch } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("---form", data);
    console.log("---files", files);
    const editorContent = window.localStorage.getItem("content");
    console.log("---content", editorContent);

    // upload description -------------
    const descriptionObject: ProductDescriptionType = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      content: JSON.stringify(editorContent),
      images: [],
      writer: session?.name ?? "Anonymous",
      comments: [],
    };
    const productDescriptionUploadResult = await createProductDescription(
      descriptionObject
    );

    if (productDescriptionUploadResult.error) {
      throw new Error(productDescriptionUploadResult.error);
    } else {
      toast.success("Created product description successfully.");
    }

    // upload product images -------------- -> make list of images
    const file = files[0] as File;
    const supabase = createSupabaseBrowserClient();
    const productImagesUploadResult = await supabase.storage
      .from("public_files")
      .upload("/public/" + file.name, file);

    if (productImagesUploadResult.error) {
      throw new Error(productImagesUploadResult!.error?.message);
    } else {
      toast.success("Upload product images successfully.");
    }

    // upload product ---------------
    const product: ProductType = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      brand: data.brand,
      name: data.name,
      description: data.description,
      images: [productImagesUploadResult!.data!.path],
      price: parseInt(data.price),
      options: data.options
        .split(",")
        .map((item) => item.trim())
        .flat(),
      rate: parseFloat(data.rate),
      sold_quantity: parseInt(data.sold_quantity),
      description_id: descriptionObject.id,
      category: data.category,
      is_deleted: false,
    };
    console.log("---product", product);
    const productUploadResult = await createProduct(product);
    console.log("---productUploadResult", productUploadResult);

    if (productUploadResult.error) {
      throw new Error(productUploadResult.error);
    } else {
      toast.success("Created product successfully.");
    }

    // create storage for this product
    const storageObject: StorageType = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      prod_id: product.id,
      prod_name: product.name,
      address: data.storage_address,
      quantity: parseInt(data.storage_quantity),
    };

    console.log("---storageObject", storageObject);
    const storageUploadResult = await createStorage(storageObject);
    if (storageUploadResult.error) {
      throw new Error(storageUploadResult.error);
    } else {
      toast.success("Created storage successfully.");
    }

    //---------
    // reset and route

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
  }, [watch]);

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
