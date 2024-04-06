import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import createSupabaseBrowserClient from "@/supabase-query/client";
import { createProduct } from "@app/_actions/product";
import { createProductDescription } from "@app/_actions/product_description";
import {
  ProductDescriptionType,
  ProductStorageType,
  ProductType,
} from "@/utils/types/index";
import { CustomerType, StaffType } from "@/utils/types/index";
import { createProductStorage } from "@/app/_actions/product_storage";
import { FormSchema } from "@/app/(protected)/dashboard/product/create/Components/CreateForm";

export async function createHandler({
  formData,
  files,
  session,
  productStorages,
}: {
  formData: z.infer<typeof FormSchema>;
  files: unknown[];
  session: CustomerType | StaffType;
  productStorages: ProductStorageType[];
}) {
  if (files.length === 0) throw new Error("Lỗi không có ảnh sản phẩm.");

  // create description:
  const editorContent = window.localStorage.getItem("content");
  const cleanedJsonString = editorContent?.replace(/\\/g, "");

  const descriptionObject: ProductDescriptionType = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    content: JSON.parse(cleanedJsonString ?? "{}"),
    writer: session?.name ?? "Không rõ",
  };

  const createProductDescriptionResult = await createProductDescription(
    descriptionObject
  );

  if (createProductDescriptionResult.error)
    throw new Error("Lỗi khi lưu mô tả sản phẩm.");

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
      throw new Error(`Lỗi khi lưu ảnh: ${uploadingFile.name}`);
    }
  }

  if (!productImagesUploadResults.length) throw new Error("Lỗi khi lưu ảnh.");

  // create product:
  const product: ProductType = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    brand: formData.brand,
    name: formData.name,
    description: formData.description,
    images: productImagesUploadResults,
    price: parseInt(formData.price),
    rate: parseFloat(formData.rate),
    sold_quantity: 0,
    description_id: descriptionObject.id,
    category: formData.category,
    is_deleted: false,
  };

  const createProductResult = await createProduct({
    product: product,
    actor: {
      actorId: session.id,
      actorName: session.name,
    },
  });

  if (createProductResult.error) throw new Error("Lỗi khi lưu sản phẩm.");

  // create product_storages:
  if (productStorages.length > 0) {
    const createdProductStorages = productStorages.map((productStorage) => ({
      ...productStorage,
      product_id: product.id,
      product_name: product.name,
    }));

    for (const createdProductStorage of createdProductStorages) {
      const createProductStorageResult = await createProductStorage({
        productStorage: createdProductStorage,
      });

      if (createProductStorageResult.error)
        throw new Error("Lỗi khi lưu kho sản phẩm.");
    }
  }

  return createProductResult;
}
