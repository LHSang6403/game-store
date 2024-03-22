"use client";

import { ProductDescriptionType } from "@/utils/types";
import { useEffect } from "react";
import Editor from "@components/Editor";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function ProductDescription({
  description,
}: {
  description: ProductDescriptionType;
}) {
  const [content, setContent] = useLocalStorage("content", description.content);

  useEffect(() => {
    setContent(description.content);
  }, []);

  return (
    <div className="-mt-10 h-fit min-h-screen w-full rounded-3xl bg-gradient-to-t from-accent p-10 !pt-0 pb-2 xl:p-4 sm:p-2">
      <Editor editable={false} />
    </div>
  );
}
