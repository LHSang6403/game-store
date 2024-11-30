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
import { useSession, SessionState } from "@/zustand/useSession";
import { v4 as uuidv4 } from "uuid";
import { StaffType, BlogType } from "@/utils/types/index";
import createSupabaseBrowserClient from "@/supabase-query/client";
import { createBlog, updateBlog } from "@app/_actions/blog";
import { Card, CardHeader, CardContent } from "@components/ui/card";
import { JSONContent } from "novel";
import { useCallback, useMemo, useState } from "react";
import ImageFileItem from "@components/File/ImageFileItem";
import { parseStringToJSONContent } from "@/utils/functions/parseStringToJSONContent";
import { defaultValueEditor } from "@/utils/default-value-editor";

const FormSchema = z.object({
  title: z.string().min(2, { message: "Vui lòng nhập tiêu đề." }),
  description: z.string().min(2, { message: "Vui lòng nhập mô tả." }),
});

export default function BlogForm({ blog }: { blog?: BlogType }) {
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession() as SessionState;

  const isEditMode = !!blog;
  const parsedContent = useMemo(
    () => (blog ? parseStringToJSONContent(blog.content) : defaultValueEditor),
    [blog]
  );

  const [content, setContent] = useState<JSONContent>(parsedContent);
  const [updatedBlogThumbnails, setUpdatedBlogThumbnails] = useState<string[]>(
    blog?.thumbnails ?? []
  );

  const initState = useMemo(
    () => ({
      title: blog?.title || "",
      description: blog?.description || "",
    }),
    [blog]
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initState,
    mode: "onChange",
  });

  const handleContentChange = useCallback((newContent: JSONContent) => {
    setContent(newContent);
  }, []);

  const handleSave = async ({
    formData,
    content,
    session,
    thumbnails,
    isEditMode,
    originalBlog,
  }: {
    formData: z.infer<typeof FormSchema>;
    content: JSONContent;
    session: StaffType;
    thumbnails: File[];
    isEditMode: boolean;
    originalBlog?: BlogType;
  }) => {
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
        toast.error("Lỗi khi tải ảnh.");
      }
    }

    if (isEditMode) {
      const updatedBlog: BlogType = {
        ...originalBlog!,
        title: formData.title,
        description: formData.description,
        content: JSON.stringify(content),
        thumbnails: [...updatedBlogThumbnails, ...blogThumbnailsUploadResults],
      };

      return updateBlog({
        updatedBlog,
        actor: {
          actorId: session.id,
          actorName: session.name,
        },
      });
    } else {
      const newBlog: BlogType = {
        id: uuidv4(),
        created_at: new Date().toISOString(),
        title: formData.title,
        description: formData.description,
        content: JSON.stringify(content),
        thumbnails: blogThumbnailsUploadResults,
        writer: session.name,
        is_deleted: false,
      };

      return createBlog({ blog: newBlog });
    }
  };

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      toast.promise(
        async () => {
          if (!session) throw new Error("Lỗi phiên đăng nhập.");

          const staffSession = session as StaffType;
          const result = await handleSave({
            formData: data,
            content: content,
            session: staffSession,
            thumbnails: files,
            isEditMode: isEditMode,
            originalBlog: blog,
          });

          if (result.error) throw new Error(result.error);
        },
        {
          loading: isEditMode
            ? "Đang lưu chỉnh sửa..."
            : "Đang tạo bài viết...",
          success: () => {
            form.reset();
            router.push("/dashboard/blog");
            return isEditMode
              ? "Chỉnh sửa bài viết thành công. Đang chuyển hướng..."
              : "Tạo bài viết thành công. Đang chuyển hướng...";
          },
          error: (error: any) => {
            return error.message;
          },
        }
      );
    },
    [content, files, form, isEditMode, router, session, updatedBlogThumbnails]
  );

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form className="flex w-full flex-col gap-4 md:flex-row">
          <Card className="h-fit min-h-[440px] w-full md:w-1/2">
            <CardHeader className="pb-3">
              {isEditMode
                ? "Chỉnh sửa thông tin bài viết"
                : "Thông tin bài viết"}
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
          <Card className="flex h-fit min-h-0 w-full flex-col md:min-h-[440px] md:w-1/2">
            <CardHeader className="pb-9">Ảnh xem trước</CardHeader>
            <CardContent>
              <DropAndDragZone className="mt-2 rounded-lg border p-6 md:p-16" />
              {isEditMode && (
                <div className="grid w-fit grid-cols-4 gap-3 md:grid-cols-6">
                  {updatedBlogThumbnails.map((image: string, index: number) => (
                    <ImageFileItem
                      key={index}
                      image={
                        process.env.NEXT_PUBLIC_SUPABASE_BUCKET_PATH + image
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
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
      <div className="">
        <h2 className="title mb-1 ml-1 text-sm font-medium">Nội dung</h2>
        <div className="mt-2 h-fit overflow-hidden rounded-lg border">
          <Editor initialValue={content} onChange={handleContentChange} />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={!form.formState.isValid || files.length === 0}
          className="mt-1 w-full bg-foreground px-7 text-background md:w-fit"
        >
          {isEditMode ? "Lưu chỉnh sửa" : "Tạo bài viết"}
        </Button>
      </div>
    </div>
  );
}
