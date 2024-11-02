import Blog from "@/components/Items/Blog";
import LargeBlog from "@components/Items/LargeBlog";
import { readBlogs } from "@/app/_actions/blog";

export default async function BlogContainer() {
  const blogs = await readBlogs({ limit: 100, offset: 0 });

  const sortedBlogs = blogs?.data?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const latestTwoBlogs = sortedBlogs?.slice(0, 3);
  const othersBlogs = sortedBlogs?.slice(3);

  return (
    <div className="flex w-full flex-col items-center gap-2 md:gap-4">
      {latestTwoBlogs && (
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <LargeBlog data={latestTwoBlogs[0]} />
          <LargeBlog data={latestTwoBlogs[1]} />
          <LargeBlog data={latestTwoBlogs[2]} />
        </div>
      )}
      <div className="grid h-fit w-full grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {othersBlogs &&
          othersBlogs?.map((blog, index) => <Blog key={index} data={blog} />)}
      </div>
    </div>
  );
}
