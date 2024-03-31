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
import Editor from "@/components/Editor";
import DropAndDragZone from "@components/File/DropAndDragZone";
import useFiles from "@/zustand/useFiles";
import { useSession } from "@/zustand/useSession";
import { StaffType, BlogType } from "@/utils/types/index";
import createSupabaseBrowserClient from "@/supabase-query/client";
import { updateBlog } from "@app/_actions/blog";
import ImageFileItem from "@components/File/ImageFileItem";
import { useState } from "react";

const FormSchema = z.object({
  title: z.string().min(2, { message: "Vui lòng nhập tiêu đề." }),
  description: z.string().min(2, { message: "Vui lòng nhập mô tả." }),
});

export default function EditForm({ blog }: { blog: BlogType }) {
  const router = useRouter();
  const { files } = useFiles();
  const { session } = useSession();

  const [updatedBlogThumbnails, setUpdatedBlogThumbnails] = useState<string[]>(
    blog.thumbnails ?? []
  );

  const initState = {
    title: blog.title,
    description: blog.description,
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initState,
    mode: "onBlur",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(
      async () => {
        if (session) {
          const staffSession = session as StaffType;

          const update = await updateHandler(blog, data, staffSession, files);

          if (update.updateBlogResponse.error) {
            toast.error(update.updateBlogResponse.error.message);
          }
        } else {
          toast.error("Lỗi phiên đăng nhập.");
        }
      },
      {
        loading: "Đang lưu chỉnh sửa...",
        success: () => {
          form.reset();
          router.push("/dashboard/blog");

          return "Chỉnh sủa bài viết thành công. Đang chuyển hướng...";
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="flex flex-col gap-10 xl:col-span-2 xl:gap-4">
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
        </div>
        <div className="flex flex-col gap-4 xl:col-span-2">
          <div>
            <h2 className="title mb-1 ml-1 mt-0.5 text-sm font-medium">
              Hình ảnh xem trước
            </h2>
            <div className="mt-2 grid w-fit grid-cols-6 gap-3 sm:grid-cols-4">
              {updatedBlogThumbnails.map((image: string, index: number) => (
                <ImageFileItem
                  key={index}
                  image={
                    process.env.NEXT_PUBLIC_SUPABASE_URL +
                    "/storage/v1/object/public/public_files/" +
                    image
                  }
                  name={image.split("/")[image.split("/").length - 1]}
                  removeHandler={() => {
                    setUpdatedBlogThumbnails((images) =>
                      images.filter((img) => img !== image)
                    );
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex h-fit w-full flex-col xl:col-span-2">
            <h2 className="title mb-1 ml-1 text-sm font-medium">
              Thêm ảnh xem trước
            </h2>
            <DropAndDragZone className="mt-2 rounded-lg border border-foreground/10 p-16 sm:p-6" />
          </div>
        </div>
        <div className="col-span-2">
          <h2 className="title mb-1 ml-1 text-sm font-medium">Nội dung</h2>
          <div className="mt-2 h-fit overflow-hidden rounded-md border">
            <Editor editable={true} />
          </div>
        </div>
        <div className="col-span-2 flex justify-center">
          <Button className="mt-1 w-fit bg-foreground px-7 text-background">
            Lưu chỉnh sửa
          </Button>
        </div>
      </form>
    </Form>
  );
}

async function updateHandler(
  originalBlog: BlogType,
  data: z.infer<typeof FormSchema>,
  session: StaffType,
  addThumbnails: File[]
) {
  const supabase = createSupabaseBrowserClient();
  const blogThumbnailsUploadResults: string[] = [];

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

  if (!blogThumbnailsUploadResults.length) throw new Error("Lỗi khi tải ảnh.");

  const editorContent = window.localStorage.getItem("content");
  const cleanedJsonString = editorContent?.replace(/\\/g, "");

  const updatedBlog: BlogType = {
    id: originalBlog.id,
    created_at: originalBlog.created_at,
    title: data.title,
    description: data.description,
    content: cleanedJsonString,
    thumbnails: [...originalBlog.thumbnails, ...blogThumbnailsUploadResults],
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
