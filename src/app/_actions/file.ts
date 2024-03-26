"use server";

import createSupabaseServerClient from "@/supabase-query/server";

export async function downloadFiles(bucket: string, files: string[]) {
  try {
    const supabase = await createSupabaseServerClient();

    console.log("Files:", files);
    const result = await supabase.storage.from(bucket).download(files[0]);

    console.log("Result:", result);

    return {
      status: 200,
      statusText: "OK",
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    console.log("---error", error.message);

    return {
      status: 500,
      statusText: "Internal server error.",
      data: null,
      error: error.message,
    };
  }
}
