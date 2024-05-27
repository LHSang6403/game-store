import BlogContainer from "@app/(main)/blog/Components/BlogContainer";

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-4 px-10 pb-6 xl:px-6 sm:px-4 sm:pb-2">
      <h1 className="mt-4">
        <span className="bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-center text-3xl font-semibold text-transparent">
          Tin tức
        </span>
      </h1>
      <div className="w-full">
        <BlogContainer />
      </div>
    </div>
  );
}
