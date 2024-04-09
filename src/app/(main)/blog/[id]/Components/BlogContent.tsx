"use client";

import Editor from "@/components/Editor";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function BlogContent({ blogContent }: { blogContent: string }) {
  const [content, setContent] = useLocalStorage("content", blogContent);

  useEffect(() => {
    setContent(blogContent);
  }, []);

  return (
    <div >
      <Editor editable={false} />
    </div>
  );
}
