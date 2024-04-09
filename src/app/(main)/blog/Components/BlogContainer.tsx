import Blog from "@/components/Items/Blog";
import { readBlogs } from "@/app/_actions/blog";

export default async function BlogContainer() {
  const blogs = await readBlogs({ limit: 100, offset: 0 });

  return (
    <div className="grid h-fit w-fit grid-cols-3 gap-4">
      {blogs.data &&
        blogs.data.map((blog, index) => <Blog key={index} data={blog} />)}
    </div>
  );
}
