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
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession();

  const initState = {
    brand: "",
    name: "",
    description: "",
    price: "1000000",
    options: "",
    rate: "4",
    sold_quantity: "0",
    category: "",
    storage_address: "",
    storage_quantity: "0",
  };

  const [content, setContent] = useLocalStorage(
    "create-product-form",
    initState
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: content ?? initState,
  });
  const { watch } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        // **** should create a tranction for these uploads ****
        const editorContent = window.localStorage.getItem("content");

        // upload description -------------
        const descriptionObject = {
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
        }

        // upload product images --------------
        const supabase = createSupabaseBrowserClient();
        const productImagesUploadResults: string[] = [];

        for (const file of files) {
          const uploadingFile = file as File;
          const result = await supabase.storage
            .from("public_files")
            .upload("/product_images/" + uploadingFile.name, uploadingFile);
          if (!result.error) productImagesUploadResults.push(result.data.path);
          else {
            toast.error(`Error uploading image: ${uploadingFile.name}`);
          }
        }
        if (!productImagesUploadResults.length)
          throw new Error("No image uploaded.");

        // upload product ---------------
        const product = {
          id: uuidv4(),
          created_at: new Date().toISOString(),
          brand: data.brand,
          name: data.name,
          description: data.description,
          images: productImagesUploadResults,
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

        const productUploadResult = await createProduct(product);
        if (productUploadResult.error) {
          throw new Error(productUploadResult.error);
        }

        // create storage for this product ---------------
        const storageObject = {
          id: uuidv4(),
          created_at: new Date().toISOString(),
          prod_id: product.id,
          prod_name: product.name,
          address: data.storage_address,
          quantity: parseInt(data.storage_quantity),
        };

        const storageUploadResult = await createStorage(storageObject);
        if (storageUploadResult.error) {
          throw new Error(storageUploadResult.error);
        }
      },
      {
        loading: "Creating product...",
        success: () => {
          form.reset();
          router.push("/dashboard/product");

          return "Product created successfully. Redirecting to dashboard...";
        },
        error: (error) => {
          return `Error: ${error.message ?? "Internal Server"}`;
        },
      }
    );
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
        <div className="flex h-fit w-full flex-col xl:col-span-2">
          <h2 className="title mb-1 ml-1 text-sm font-medium">
            Product images
          </h2>
          <DropAndDragZone className="mt-2 rounded-lg border p-16 sm:p-6" />
        </div>
        <div className="col-span-2">
          <h2 className="title mb-1 ml-1 text-sm font-medium">Description</h2>
          <div className="mt-2 h-fit overflow-hidden rounded-md border">
            <Editor editable={true} />
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
