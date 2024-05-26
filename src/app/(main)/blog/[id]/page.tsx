"use client";

import { readBlogById } from "@app/_actions/blog";
import { useQuery } from "@tanstack/react-query";
import BlogContent from "@app/(main)/blog/[id]/Components/BlogContent";
import BlogThumbnails from "@app/(main)/blog/[id]/Components/BlogThumbnails";
import Loading from "@app/(main)/blog/[id]/Components/BlogLoadingSkeleton";

export default function page({ params }: { params: { id: string } }) {
  const {
    data: blog,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["blog", params.id],
    queryFn: () => readBlogById(params.id),
    staleTime: 60 * (60 * 1000),
  });

  if (error) {
    throw new Error(error.message || "Không tìm thấy bài viết.");
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 rounded-3xl bg-gradient-to-t from-accent">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isSuccess && blog.data && (
            <>
              <h1 className="mt-6 max-w-[900px] bg-gradient-to-r from-[#9733ED] via-[#F22B9C] to-[#FD7A36] bg-clip-text px-8 text-center text-3xl font-bold text-transparent xl:px-6 sm:px-2">
                {blog.data.title}
              </h1>
              <p className="-mt-2 max-w-[1000px] p-6 sm:p-2">
                {blog.data.description}
              </p>
              {blog.data.thumbnails && (
                <BlogThumbnails thumbs={blog?.data?.thumbnails} />
              )}
              {blog.data.content && (
                <BlogContent blogContent={blog.data.content} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
