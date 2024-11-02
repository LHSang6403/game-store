import BlogForm from "../_components/BlogForn";

export default function page() {
  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-2 pb-4 sm:pb-2">
      <h1 className="my-2 text-2xl font-medium">Viết bài</h1>
      <div className="h-fit w-full">
        <BlogForm />
      </div>
    </div>
  );
}
