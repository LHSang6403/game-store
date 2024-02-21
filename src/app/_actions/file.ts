"use server";

import createSupabaseServerClient from "@supabase/server";

export async function uploadFile(file: File, pathName: string) {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.storage
      .from("public_files")
      .upload(pathName + file.name, file);

    if (data) {
      // Handle success
    } else {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFiles(files: File[], folderName: string) {
  try {
    const supabase = await createSupabaseServerClient();

    for (const file of files) {
      const { data, error } = await supabase.storage
        .from("public_files")
        .upload(folderName + file.name, file);

      if (data) {
        // Handle success
      } else {
        console.log(error);
      }
    }
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
