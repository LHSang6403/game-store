import Blog from "@/components/Items/Blog";
import LargeBlog from "@components/Items/LargeBlog";
import { readBlogs } from "@/app/_actions/blog";

export default async function BlogContainer() {
  const blogs = await readBlogs({ limit: 100, offset: 0 });

  const sortedBlogs = blogs?.data?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const latestTwoBlogs = sortedBlogs?.slice(0, 2);
  const othersBlogs = sortedBlogs?.slice(2);

  return (
    <div className="flex w-full flex-col items-center gap-4 sm:gap-2">
      {latestTwoBlogs && (
        <div className="flex flex-row gap-4 lg:flex-col">
          <LargeBlog data={latestTwoBlogs[0]} />
          <LargeBlog data={latestTwoBlogs[1]} />
        </div>
      )}
      <div className="grid h-fit w-fit grid-cols-4 gap-4 px-10 xl:grid-cols-3 xl:px-0 lg:grid-cols-2 sm:grid-cols-1 sm:gap-2">
        {othersBlogs &&
          othersBlogs?.map((blog, index) => <Blog key={index} data={blog} />)}
      </div>
    </div>
  );
}
