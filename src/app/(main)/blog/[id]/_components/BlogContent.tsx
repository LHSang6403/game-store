"use client";

import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { parseStringToJSONContent } from "@/utils/functions/parseStringToJSONContent";

export default function BlogContent({ blogContent }: { blogContent: string }) {
  const content: JSONContent = parseStringToJSONContent(blogContent);

  return (
    <div className="px-0 pb-4 md:pb-0 xl:px-16">
      <Editor initialValue={content} onChange={() => {}} isDisable={true} />
    </div>
  );
}
