"use client";

import EditForm from "@app/(protected)/dashboard/product/[edit_id]/Components/EditForm";
import useProductQuery from "@/hooks/useProductQuery";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";

export default function page({ params }: { params: { edit_id: string } }) {
  const { data: productResponse } = useProductQuery({
    id: params.edit_id,
  });

  const [content, setContent] = useLocalStorage(
    "content",
    productResponse?.product_description?.content ?? ""
  );

  useEffect(() => {
    setContent(productResponse?.product_description?.content ?? "");
  }, [productResponse?.product_description]);

  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-2 pb-6">
      <h1 className="my-2 text-2xl font-medium">Edit product</h1>
      <div className="h-fit w-full">
        {productResponse && <EditForm product={productResponse} />}
      </div>
    </div>
  );
}
