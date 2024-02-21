import CreateForm from "./Components/CreateForm";

export default function page() {
  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-6 pb-6 sm:gap-2">
      <h1 className="my-2 text-2xl font-medium">Create product</h1>
      <div className="h-fit w-full">
        <CreateForm />
      </div>
    </div>
  );
}
