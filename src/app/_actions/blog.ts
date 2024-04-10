"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import { BlogType, LogActorType } from "@utils/types";
import { saveToLog } from "@app/_actions/log";
import { checkRoleStaff } from "@app/_actions/user";
import { revalidatePath } from "next/cache";

export async function createBlog({ blog }: { blog: BlogType }) {
  try {
    const isManagerAuthenticated = await checkRoleStaff({
      role: "Quản lý",
    });
    const isSellerAuthenticated = await checkRoleStaff({
      role: "Biên tập",
    });

    if (!isManagerAuthenticated && !isSellerAuthenticated)
      throw new Error("Không có quyền tạo bài viết");

    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("blog").insert(blog);

    revalidatePath("/dashboard/blog");

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: error,
    };
  }
}

export async function readBlogs({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("blog")
      .select("*")
      .range(offset, limit)
      .eq("is_deleted", false);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as BlogType[],
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: error,
    };
  }
}

export async function readBlogById(id: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("blog")
      .select("*")
      .eq("id", id)
      .eq("is_deleted", false)
      .single();

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data as BlogType,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: error,
    };
  }
}

export async function deleteBlogById({
  blog,
  actor,
}: {
  blog: BlogType;
  actor: LogActorType;
}) {
  try {
    const isManagerAuthenticated = await checkRoleStaff({
      role: "Quản lý",
    });
    const isSellerAuthenticated = await checkRoleStaff({
      role: "Biên tập",
    });

    if (!isManagerAuthenticated && !isSellerAuthenticated)
      throw new Error("Không có quyền xóa bài viết");

    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("blog")
      .update({ is_deleted: true })
      .eq("id", blog.id);

    await saveToLog({
      logName: "Xóa bài viết " + blog.title,
      logType: "Xóa",
      logResult: !result.error ? "Thành công" : "Thất bại",
      logActor: actor,
    });

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: error,
    };
  }
}

export async function updateBlog({
  updatedBlog,
  actor,
}: {
  updatedBlog: BlogType;
  actor: LogActorType;
}) {
  try {
    const isManagerAuthenticated = await checkRoleStaff({
      role: "Quản lý",
    });
    const isWriterAuthenticated = await checkRoleStaff({
      role: "Biên tập",
    });

    if (!isManagerAuthenticated && !isWriterAuthenticated)
      throw new Error("Không có quyền cập nhật bài viết");

    console.log({ isWriterAuthenticated, isManagerAuthenticated });

    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("blog")
      .update(updatedBlog)
      .eq("id", updatedBlog.id)
      .eq("is_deleted", false);

    console.log({ result });

    await saveToLog({
      logName: "Cập nhật bài viết " + updatedBlog.title,
      logType: "Cập nhật",
      logResult: !result.error ? "Thành công" : "Thất bại",
      logActor: actor,
    });

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Lỗi máy chủ",
      data: null,
      error: error,
    };
  }
}
