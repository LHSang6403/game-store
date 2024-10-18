"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Form } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DropAndDragZone from "@components/File/DropAndDragZone";
import useFiles from "@/zustand/useFiles";
import { useSession, SessionState } from "@/zustand/useSession";
import { StaffType, BlogType } from "@/utils/types/index";
import createSupabaseBrowserClient from "@/supabase-query/client";
import { updateBlog } from "@app/_actions/blog";
import ImageFileItem from "@components/File/ImageFileItem";
import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { JSONContent } from "novel";
import Editor from "@/components/editor/advanced-editor";
import { parseStringToJSONContent } from "@/utils/functions/parseStringToJSONContent";

const FormSchema = z.object({
  title: z.string().min(2, { message: "Vui lòng nhập tiêu đề." }),
  description: z.string().min(2, { message: "Vui lòng nhập mô tả." }),
});

export default function EditForm({ blog }: { blog: BlogType }) {
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession() as SessionState;

  const parsedContent = useMemo(
    () => parseStringToJSONContent(blog.content),
    [blog.content]
  );

  const [content, setContent] = useState<JSONContent>(parsedContent);

  const [updatedBlogThumbnails, setUpdatedBlogThumbnails] = useState<string[]>(
    blog.thumbnails ?? []
  );

  const initState = useMemo(
    () => ({
      title: blog.title,
      description: blog.description,
    }),
    [blog.title, blog.description]
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initState,
    mode: "onChange",
  });

  const handleContentChange = useCallback((newContent: JSONContent) => {
    setContent(newContent);
  }, []);

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      toast.promise(
        async () => {
          if (!session) throw new Error("Lỗi phiên đăng nhập.");

          const staffSession = session as StaffType;
          const result = await handleUpdate({
            originalBlog: blog,
            formData: data,
            content: content,
            session: staffSession,
            updatedThumbnails: updatedBlogThumbnails,
            addThumbnails: files,
          });

          if (result.updateBlogResponse.error)
            throw new Error(result.updateBlogResponse.error);
        },
        {
          loading: "Đang lưu chỉnh sửa...",
          success: () => {
            form.reset();
            router.push("/dashboard/blog");
            return "Chỉnh sửa bài viết thành công. Đang chuyển hướng...";
          },
          error: (error: any) => {
            return error.message;
          },
        }
      );
    },
    [blog, content, files, form, router, session, updatedBlogThumbnails]
  );

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form className="flex w-full flex-row gap-4 xl:flex-col">
          <Card className="h-fit min-h-[440px] w-1/2 xl:w-full">
            <CardHeader className="pb-3 sm:px-2">
              Chỉnh sửa thông tin bài viết
            </CardHeader>
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
                        placeholder="Mô tả ngắn bài viết"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card className="h-fit min-h-[440px] w-1/2 xl:min-h-0 xl:w-full">
            <CardHeader className="pb-3 sm:px-2">Hình ảnh xem trước</CardHeader>
            <CardContent className="flex flex-col gap-4 pb-0">
              <div className="grid w-fit grid-cols-6 gap-3 sm:grid-cols-4">
                {updatedBlogThumbnails.map((image: string, index: number) => (
                  <ImageFileItem
                    key={index}
                    image={
                      process.env.NEXT_PUBLIC_SUPABASE_URL +
                      "/storage/v1/object/public/public_files/" +
                      image
                    }
                    name={image.split("/")[image.split("/").length - 1]}
                    handleRemove={() => {
                      setUpdatedBlogThumbnails((images) =>
                        images.filter((img) => img !== image)
                      );
                    }}
                  />
                ))}
              </div>
              <div className="flex h-fit w-full flex-col xl:col-span-2">
                <h2 className="title mb-1 ml-1 text-sm font-medium">
                  Thêm ảnh xem trước
                </h2>
                <DropAndDragZone className="mt-2 rounded-lg border p-16 sm:p-6" />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
      <div>
        <h2 className="title mb-1 ml-1 text-sm font-medium">Nội dung</h2>
        <div className="mt-2 h-fit overflow-hidden rounded-lg border">
          <Editor initialValue={content} onChange={handleContentChange} />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="mt-1 w-fit bg-foreground px-7 text-background sm:w-full"
        >
          Lưu chỉnh sửa
        </Button>
      </div>
    </div>
  );
}

async function handleUpdate({
  originalBlog,
  formData,
  content,
  session,
  updatedThumbnails,
  addThumbnails,
}: {
  originalBlog: BlogType;
  formData: z.infer<typeof FormSchema>;
  content: JSONContent;
  session: StaffType;
  updatedThumbnails: string[];
  addThumbnails: File[];
}) {
  if (updatedThumbnails.length === 0 && addThumbnails.length === 0) {
    throw new Error("Lỗi không có ảnh thumbnail.");
  }

  const supabase = createSupabaseBrowserClient();

  const blogThumbnailsUploadResults: string[] = [];
  if (addThumbnails.length > 0) {
    for (const file of addThumbnails) {
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

    if (!blogThumbnailsUploadResults.length)
      throw new Error("Lỗi khi tải ảnh.");
  }

  const updatedBlog: BlogType = {
    id: originalBlog.id,
    created_at: originalBlog.created_at,
    title: formData.title,
    description: formData.description,
    content: JSON.stringify(content),
    thumbnails: [...updatedThumbnails, ...blogThumbnailsUploadResults],
    writer: originalBlog.writer,
    is_deleted: false,
  };

  const updateBlogResponse = await updateBlog({
    updatedBlog: updatedBlog,
    actor: {
      actorId: session.id,
      actorName: session.name,
    },
  });

  return { updateBlogResponse };
}
