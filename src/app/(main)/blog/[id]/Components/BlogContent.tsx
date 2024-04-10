"use client";

import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { parseStringToJSONContent } from "@/utils/functions/parseStringToJSONContent";

export default function BlogContent({ blogContent }: { blogContent: string }) {
  const content: JSONContent = parseStringToJSONContent(blogContent);

  return (
    <div>
      <Editor initialValue={content} onChange={() => {}} />
    </div>
  );
}
