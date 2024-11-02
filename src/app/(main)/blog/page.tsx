import BlogContainer from "@/app/(main)/blog/_components/BlogContainer";

export default function Page() {
  return (
    <div className="relative flex w-full flex-col items-center gap-4 px-4 pb-2 md:px-6 md:pb-6 xl:px-10">
      <h1 className="mt-4">
        <span className="bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-center text-3xl font-semibold text-transparent">
          Tin tức
        </span>
      </h1>
      <div className="w-full max-w-[1800px]">
        <BlogContainer />
      </div>
    </div>
  );
}
