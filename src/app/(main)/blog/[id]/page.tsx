import { readBlogById } from "@app/_actions/blog";
import BlogContent from "@app/(main)/blog/[id]/Components/BlogContent";
import BlogThumbnails from "@app/(main)/blog/[id]/Components/BlogThumbnails";

export default async function page({ params }: { params: { id: string } }) {
  const blog = await readBlogById(params.id);

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 rounded-3xl bg-gradient-to-t from-accent pt-4">
      <h1 className="max-w-[900px] px-8 text-center text-4xl font-bold xl:px-6 sm:px-2">
        {blog?.data?.title}
      </h1>
      <p className="max-w-[1000px] p-8 xl:p-6 sm:p-2">
        {blog?.data?.description}
      </p>
      {blog?.data?.thumbnails && (
        <BlogThumbnails thumbs={blog?.data?.thumbnails} />
      )}
      {blog && blog.data && blog.data.content && (
        <BlogContent blogContent={blog.data.content} />
      )}
    </div>
  );
}
