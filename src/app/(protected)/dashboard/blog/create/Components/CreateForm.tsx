"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Form } from "@components/ui/form";
import { Button } from "@components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Editor from "@/components/editor/advanced-editor";
import DropAndDragZone from "@components/File/DropAndDragZone";
import { useRouter } from "next/navigation";
import useFiles from "@/zustand/useFiles";
import { useSession } from "@/zustand/useSession";
import { v4 as uuidv4 } from "uuid";
import { StaffType, BlogType } from "@/utils/types/index";
import createSupabaseBrowserClient from "@/supabase-query/client";
import { createBlog } from "@app/_actions/blog";
import { Card, CardHeader, CardContent } from "@components/ui/card";
import { defaultValueEditor } from "@/utils/default-value-editor";
import { JSONContent } from "novel";
import { useState } from "react";

const FormSchema = z.object({
  title: z.string().min(2, { message: "Vui lòng nhập tiêu đề." }),
  description: z.string().min(2, { message: "Vui lòng nhập mô tả." }),
});

export default function CreateForm() {
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession();

  const [content, setContent] = useState<JSONContent>(defaultValueEditor);

  const initState = {
    title: "",
    description: "",
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initState,
    mode: "onChange",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        if (!session) throw new Error("Lỗi phiên đăng nhập.");

        const staffSession = session as StaffType;
        const result = await createHandler({
          formData: data,
          content: content,
          session: staffSession,
          thumbnails: files,
        });

        if (result.createBlogResponse.error)
          throw new Error(result.createBlogResponse.error);
      },
      {
        loading: "Đang tạo bài viết...",
        success: () => {
          form.reset();
          router.push("/dashboard/blog");

          return "Tạo bài viết thành công. Đang chuyển hướng...";
        },
        error: (error: any) => {
          return error.message;
        },
      }
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form className="flex w-full flex-row gap-4 xl:flex-col">
          <Card className="h-fit min-h-[440px] w-1/2 xl:w-full">
            <CardHeader className="pb-3">Thông tin bài viêt</CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu đề</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tiêu đề bài viết"
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
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea
                        className="max-h-52 min-h-36 border-[#E5E7EB]"
                        placeholder="Mô tả ngắn của bài viết"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card className="flex h-fit min-h-[440px] w-1/2 flex-col xl:min-h-0 xl:w-full">
            <CardHeader className="pb-3">Ảnh xem trước</CardHeader>
            <CardContent>
              <DropAndDragZone className="mt-2 rounded-lg border p-16 sm:p-6" />
            </CardContent>
          </Card>
        </form>
      </Form>
      <div className="">
        <h2 className="title mb-1 ml-1 text-sm font-medium">Nội dung</h2>
        <div className="mt-2 h-fit overflow-hidden rounded-lg border">
          <Editor initialValue={content} onChange={setContent} />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={!form.formState.isValid || files.length === 0}
          className="mt-1 w-fit bg-foreground px-7 text-background sm:w-full"
        >
          Tạo bài viết
        </Button>
      </div>
    </div>
  );
}

async function createHandler({
  formData,
  content,
  session,
  thumbnails,
}: {
  formData: z.infer<typeof FormSchema>;
  content: JSONContent;
  session: StaffType;
  thumbnails: File[];
}) {
  const supabase = createSupabaseBrowserClient();
  const blogThumbnailsUploadResults: string[] = [];

  if (thumbnails.length === 0)
    throw new Error("Vui lòng tải lên ít nhất 1 ảnh.");

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
      toast.error("Lỗi khi tải ảnh.");
    }
  }

  if (!blogThumbnailsUploadResults.length) throw new Error("Lỗi khi tải ảnh.");

  const blog: BlogType = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    title: formData.title,
    description: formData.description,
    content: JSON.stringify(content),
    thumbnails: blogThumbnailsUploadResults,
    writer: session.name,
    is_deleted: false,
  };

  const createBlogResponse = await createBlog({ blog });

  return { createBlogResponse };
}
