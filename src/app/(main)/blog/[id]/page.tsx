import { readBlogById } from "@app/_actions/blog";
import BlogContent from "@app/(main)/blog/[id]/Components/BlogContent";
import BlogThumbnails from "@app/(main)/blog/[id]/Components/BlogThumbnails";

export default async function page({ params }: { params: { id: string } }) {
  const blog = await readBlogById(params.id);

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 rounded-3xl bg-gradient-to-t from-accent p-8 xl:p-4 sm:p-2">
      <h1 className="max-w-[900px] text-center text-4xl font-bold">
        {blog?.data?.title}
      </h1>
      <p className="max-w-[1000px]">{blog?.data?.description}</p>
      {blog?.data?.thumbnails && (
        <BlogThumbnails thumbs={blog?.data?.thumbnails} />
      )}
      {blog?.data?.content && <BlogContent blogContent={blog?.data?.content} />}
    </div>
  );
}
