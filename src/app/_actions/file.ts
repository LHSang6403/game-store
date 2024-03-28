"use server";

import createSupabaseServerClient from "@/supabase-query/server";

export async function downloadFiles(bucket: string, files: string[]) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.storage.from(bucket).download(files[0]);

    return {
      status: 200,
      statusText: "OK",
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal server error.",
      data: null,
      error: error.message,
    };
  }
}
