import Editor from "@/components/Editor";
// import { Editor } from "novel";

export default function page() {
  return (
    <div className="min-h-[calc(100vh_-_6rem)] border rounded-md overflow-hidden">
      <Editor />
    </div>
  );
}
