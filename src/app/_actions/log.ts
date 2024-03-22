"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type { LogType } from "@utils/types/index";

export async function createLog({ log }: { log: LogType }) {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("log").insert(log);

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal server error",
      data: null,
      error: error.message,
    };
  }
}

export async function readLogs() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("log").select("*");

    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
      error: result.error,
    };
  } catch (error: any) {
    return {
      status: 500,
      statusText: "Internal server error",
      data: null,
      error: error.message,
    };
  }
}
