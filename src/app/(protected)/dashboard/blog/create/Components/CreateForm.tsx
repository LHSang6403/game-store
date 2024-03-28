"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Form } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";
import DropAndDragZone from "@components/File/DropAndDragZone";
import useFiles from "@/zustand/useFiles";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useSession } from "@/zustand/useSession";
import { v4 as uuidv4 } from "uuid";
import { StaffType, BlogType } from "@/utils/types/index";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import createSupabaseBrowserClient from "@/supabase-query/client";
import { createBlog } from "@app/_actions/blog";

const FormSchema = z.object({
  title: z.string().min(2, { message: "Title is a compulsory." }),
  description: z.string().min(2, { message: "Description is a compulsory." }),
});

export default function CreateForm() {
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession();

  const initState = {
    title: "",
    description: "",
  };

  const [content, setContent] = useLocalStorage("create-blog-form", initState);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: content ?? initState,
    mode: "onBlur",
  });
  const { watch } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        if (session) {
          const staffSession = session as StaffType;

          const update = await createHandler(data, staffSession, files);
          if (update.createBlogResponse.error) {
            toast.error(update.createBlogResponse.error.message);
          }
        } else {
          toast.error("Unknown session.");
        }
      },
      {
        loading: "Creating blog...",
        success: () => {
          form.reset();
          router.push("/dashboard/blog");

          return "Blog created successfully. Redirecting to dashboard...";
        },
      }
    );
  }

  useEffect(() => {
    const formValues = form.getValues();
    setContent(formValues);
  }, [watch]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="flex flex-col gap-4 xl:col-span-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Blog's title"
                    {...field}
                    type="text"
                    onChange={field.onChange}
                    className="border-[#E5E7EB]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="max-h-52 min-h-36 border-[#E5E7EB]"
                    placeholder="Blog's description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex h-fit w-full flex-col xl:col-span-2">
          <h2 className="title mb-1 ml-1 text-sm font-medium">
            Blog thumbnails
          </h2>
          <DropAndDragZone className="mt-2 rounded-lg border p-16 sm:p-6" />
        </div>
        <div className="col-span-2">
          <h2 className="title mb-1 ml-1 text-sm font-medium">Content</h2>
          <div className="mt-2 h-fit overflow-hidden rounded-md border">
            <Editor editable={true} />
          </div>
        </div>
        <div className="col-span-2 flex justify-center">
          <Button className="mt-1 w-fit bg-foreground px-7 text-background">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}

async function createHandler(
  data: z.infer<typeof FormSchema>,
  session: StaffType,
  thumbnails: File[]
) {
  const supabase = createSupabaseBrowserClient();
  const blogThumbnailsUploadResults: string[] = [];

  for (const file of thumbnails) {
    const uploadingFile = file as File;

    const result = await supabase.storage
      .from("public_files")
      .upload("/blog_thumbnails/" + uploadingFile.name, uploadingFile, {
        upsert: true,
        duplex: "half",
      });

    if (!result.error) blogThumbnailsUploadResults.push(result.data.path);
    else {
      toast.error(`Error uploading image: ${uploadingFile.name}`);
    }
  }

  if (!blogThumbnailsUploadResults.length)
    throw new Error("No image uploaded.");

  const editorContent = window.localStorage.getItem("content");
  const cleanedJsonString = editorContent?.replace(/\\/g, "");

  const blog: BlogType = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    title: data.title,
    description: data.description,
    content: cleanedJsonString,
    thumbnails: blogThumbnailsUploadResults,
    writer: session.name,
    is_deleted: false,
  };

  const createBlogResponse = await createBlog({ blog });

  return { createBlogResponse };
}
