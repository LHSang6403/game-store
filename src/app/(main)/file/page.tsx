import DropAndDragZone from "@/components/File/DropAndDragZone";
export default function File() {
  return (
    <>
      <div className="w-screen h-fit min-h-screen px-3 flex flex-col gap-4 items-center">
        <h1 className="mt-4 text-2xl font-bold">Files uploading</h1>
        <div className="w-[700px] sm:w-full h-fit">
          <DropAndDragZone className="rounded-lg border border-foreground/10 p-16" />
        </div>
      </div>
    </>
  );
}
