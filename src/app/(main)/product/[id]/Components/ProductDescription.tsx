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
  const [content, setContent] = useLocalStorage(
    "content",
    JSON.parse(description.content)
  );

  useEffect(() => {
    setContent(JSON.parse(description.content));
  }, []);

  return (
    <div className="-mt-10 h-fit min-h-screen w-full rounded-3xl bg-gradient-to-t from-accent px-16 py-10 !pt-0 xl:p-8 sm:p-2">
      <Editor editable={false} />
    </div>
  );
}
