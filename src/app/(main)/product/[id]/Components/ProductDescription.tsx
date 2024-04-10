"use client";

import { ProductDescriptionType } from "@/utils/types";
import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { parseStringToJSONContent } from "@/utils/functions/parseStringToJSONContent";

export default function ProductDescription({
  description,
}: {
  description: ProductDescriptionType;
}) {
  const content: JSONContent = parseStringToJSONContent(description.content);

  return (
    <div className="px-16 xl:px-6 sm:px-2">
      <Editor initialValue={content} onChange={() => {}} />
    </div>
  );
}
