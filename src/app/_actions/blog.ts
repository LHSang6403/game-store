"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import { BlogType } from "@utils/types";
import { saveToLog, LogActorType } from "@app/_actions/log";

export async function createBlog({ blog }: { blog: BlogType }) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("blog").insert(blog);

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
    const supabase = await createSupabaseServerClient();

    const result = await supabase
      .from("blog")
      .update(updatedBlog)
      .eq("id", updatedBlog.id)
      .eq("is_deleted", false);

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
