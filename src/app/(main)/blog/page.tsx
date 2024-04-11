import BlogContainer from "@app/(main)/blog/Components/BlogContainer";

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col gap-4 px-10 pb-6 xl:px-6 sm:px-4 sm:pb-2">
      <div className="to-hsl(222.2, 84%, 4%) absolute -z-10 -ml-10 h-full w-1/2 -skew-x-[20deg] bg-gradient-to-r from-foreground/10 sm:-ml-20"></div>
      <div className="to-hsl(222.2, 84%, 4%) absolute -z-10 ml-16 h-full w-1/2 -skew-x-[20deg] bg-gradient-to-r from-accent sm:ml-10"></div>
      <h1 className="mt-4 text-center text-3xl font-semibold">Tin tức</h1>
      <div>
        <BlogContainer />
      </div>
    </div>
  );
}
