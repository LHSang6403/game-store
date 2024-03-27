"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Form } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";
import DropAndDragZone from "@components/File/DropAndDragZone";
import ProductFormInputs from "@/app/(protected)/dashboard/product/create/Components/ProductFormInputs";
import useFiles from "@/zustand/useFiles";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSession } from "@/zustand/useSession";
import { v4 as uuidv4 } from "uuid";
import createSupabaseBrowserClient from "@/supabase-query/client";
import { createProduct } from "@app/_actions/product";
import { createStorage } from "@app/_actions/storage";
import { createProductDescription } from "@app/_actions/product_description";
import { ApiErrorHandlerClient } from "@/utils/errorHandler/apiErrorHandler";
import { ProductDescriptionType } from "@/utils/types/index";
import {
  CustomerType,
  StaffType,
  ProductWithDescriptionAndStorageType,
} from "@/utils/types/index";

const FormSchema = z.object({
  brand: z.string().min(2, { message: "Brand is a compulsory." }),
  name: z.string().min(2, { message: "Name is a compulsory." }),
  description: z.string().min(2, { message: "Description is a compulsory." }),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  rate: z
    .string()
    .refine(
      (val) =>
        !isNaN(parseFloat(val)) && parseFloat(val) >= 0 && parseFloat(val) <= 5,
      {
        message: "Rate must be a number between 0 and 5",
      }
    ),
  sold_quantity: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
  category: z.string(),
  storage_address: z.string().min(2, { message: "Address is a compulsory." }),
  storage_quantity: z
    .string()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
});

export default function CreateForm({
  product,
}: {
  product?: ProductWithDescriptionAndStorageType;
}) {
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession();

  const initState = {
    brand: product?.brand ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price.toString() ?? "1000000",
    rate: product?.rate.toString() ?? "4",
    sold_quantity: product?.sold_quantity.toString() ?? "0",
    category: product?.category ?? "",
    storage_address: product?.storage[0]?.address ?? "",
    storage_quantity: product?.storage[0]?.quantity.toString() ?? "0",
  };

  const [content, setContent] = useLocalStorage(
    "create-product-form",
    initState
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: content ?? initState,
    mode: "onBlur",
  });
  const { watch } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        await createHandler(data, files, session);
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
          <ProductFormInputs form={form} />
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

async function createHandler(
  data: z.infer<typeof FormSchema>,
  files: unknown[],
  session: CustomerType | StaffType | null
) {
  // **** should create a tranction for these uploads ****
  const editorContent = window.localStorage.getItem("content");
  const cleanedJsonString = editorContent?.replace(/\\/g, "");

  // upload description:
  const descriptionObject: ProductDescriptionType = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    content: JSON.parse(cleanedJsonString ?? "{}"),
    writer: session?.name ?? "Anonymous",
    comments: [],
  };

  const roductDescriptionUploadResponse = await createProductDescription(
    descriptionObject
  );

  const productDescriptionUpload = ApiErrorHandlerClient<any>({
    response: roductDescriptionUploadResponse,
    isShowToast: false,
  });

  // upload product images:
  const supabase = createSupabaseBrowserClient();
  const productImagesUploadResults: string[] = [];

  for (const file of files) {
    const uploadingFile = file as File;
    const result = await supabase.storage
      .from("public_files")
      .upload("/product_images/" + uploadingFile.name, uploadingFile, {
        upsert: true,
        duplex: "half",
      });

    if (!result.error) productImagesUploadResults.push(result.data.path);
    else {
      toast.error(`Error uploading image: ${uploadingFile.name}`);
    }
  }

  if (!productImagesUploadResults.length) throw new Error("No image uploaded.");

  // upload product:
  const product = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    brand: data.brand,
    name: data.name,
    description: data.description,
    images: productImagesUploadResults,
    price: parseInt(data.price),
    rate: parseFloat(data.rate),
    sold_quantity: parseInt(data.sold_quantity),
    description_id: descriptionObject.id,
    category: data.category,
    is_deleted: false,
  };

  const productUploadResponse = await createProduct(product);

  const productUpload = ApiErrorHandlerClient<any>({
    response: productUploadResponse,
    isShowToast: false,
  });

  // create storage for this product:
  const storageObject = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    prod_id: product.id,
    prod_name: product.name,
    address: data.storage_address,
    quantity: parseInt(data.storage_quantity),
  };

  const storageCreateResponse = await createStorage(storageObject);

  const storageCreate = ApiErrorHandlerClient<any>({
    response: storageCreateResponse,
    isShowToast: false,
  });
}
