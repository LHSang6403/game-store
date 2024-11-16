"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { readBlogById } from "@app/_actions/blog";
import BlogForm from "../_components/BlogForm";

export default function page({ params }: { params: { edit_id: string } }) {
  const { data: blog } = useQuery({
    queryKey: ["Blog", params.edit_id],
    queryFn: () => readBlogById(params.edit_id),
  });

  const [_, setContent] = useLocalStorage("content", blog?.data?.content ?? "");

  useEffect(() => {
    setContent(blog?.data?.content ?? "");
  }, [blog?.data?.content]);

  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-2 md:pb-4 spb-2">
      <h1 className="my-2 text-2xl font-medium">Chỉnh sửa bài viết</h1>
      <div className="h-fit w-full">
        {blog?.data && <BlogForm blog={blog.data} />}
      </div>
    </div>
  );
}
