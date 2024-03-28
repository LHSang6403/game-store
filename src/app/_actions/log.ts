"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type { LogType } from "@utils/types/index";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

export interface LogActorType {
  actorId: string;
  actorName: string;
}

export async function saveToLog({
  logName,
  logType,
  logResult,
  logActor,
}: {
  logName: string;
  logType: "Read" | "Create" | "Update" | "Delete";
  logResult: "Success" | "Error";
  logActor: LogActorType;
}) {
  try {
    const supabase = await createSupabaseServerClient();

    const log: LogType = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      name: logName,
      type: logType,
      result: logResult,
      actor_id: logActor.actorId,
      actor_name: logActor.actorName,
    };

    const result = await supabase.from("log").insert(log);

    if (!result.error) revalidatePath("/dashboard/log");

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
