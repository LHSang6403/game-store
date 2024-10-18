"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import { buildResponse } from "@/utils/functions/buildResponse";
import { ApiStatus, ApiStatusNumber } from "@/utils/types/apiStatus";

export async function downloadFiles(bucket: string, files: string[]) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.storage.from(bucket).download(files[0]);

    return buildResponse({
      status: ApiStatusNumber.Success,
      statusText: ApiStatus.Success,
      data: result.data,
      error: result.error,
    });
  } catch (error: any) {
    return buildResponse({
      status: ApiStatusNumber.InternalServerError,
      statusText: ApiStatus.InternalServerError,
      data: null,
      error: error.message,
    });
  }
}
