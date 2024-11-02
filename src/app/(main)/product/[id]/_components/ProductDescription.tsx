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
    <div className="px-2 md:px-6 xl:px-16">
      <Editor initialValue={content} onChange={() => {}} isDisable={true} />
    </div>
  );
}
