"use server";

import createSupabaseServerClient from "@/supabase-query/server";

export async function uploadFile(file: File, pathName: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.storage
      .from("public_files")
      .upload("/public/" + file.name, file);

    if (result.error) {
      console.log("ERR", result.error);
    }

    const response = {
      body: null,
      locked: false,
      headers: new Headers(),
      ok: result.error ? false : true,
      redirected: false,
      status: result.error ? 401 : 200,
      statusText: result.error ? "Unauthorized" : "OK",
      type: "basic",
      url: "http://localhost:3001/api/upload",
    };

    return response;
  } catch (error: any) {
    console.error("Upload error:", error);
    throw error;
  }
}

export async function uploadFiles(files: File[], folderName: string) {
  try {
    const supabase = await createSupabaseServerClient();

    let results = [] as { data: unknown; error: unknown }[];

    for (const file of files) {
      const result = await supabase.storage
        .from("public_files")
        .upload(folderName + file.name, file);

      if (!result.error) {
        results.push(result);
      }
    }

    return {
      status: 200,
      statusText: "OK",
      data: results?.map((result) => result.data),
      error: results[results.length - 1].error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal Server Error.",
      data: null,
      error: error.message,
    };
  }
}
