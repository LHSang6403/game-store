"use server";

import createSupabaseServerClient from "@supabase/server";

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
    console.log(response);

    return response;
  } catch (error: any) {
    console.error("Upload error:", error);
    throw error;
  }
}

export async function uploadFiles(files: File[], folderName: string) {
  try {
    const supabase = await createSupabaseServerClient();

    var results = [] as { data: unknown; error: unknown }[];

    for (const file of files) {
      const result = await supabase.storage
        .from("public_files")
        .upload(folderName + file.name, file);

      if (!result.error) {
        results.push(result);
      }
    }

    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function readFile() {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.storage
      .from("avatars")
      .download("folder/avatar1.png");

    if (data) {
      // Handle success
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function readAllFiles() {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.storage
      .from("avatars")
      .list("folder", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data) {
      // Handle success
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}
