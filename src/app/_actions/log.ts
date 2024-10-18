"use server";

import createSupabaseServerClient from "@/supabase-query/server";
import type { LogType } from "@utils/types/index";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { LogActorType } from "@utils/types/index";
import { buildResponse } from "@/utils/functions/buildResponse";
import { Log } from "@/utils/types/log";
import { ApiStatus, ApiStatusNumber } from "@/utils/types/apiStatus";

export async function saveToLog({
  logName,
  logType,
  logResult,
  logActor,
}: {
  logName: string;
  logType: Log;
  logResult: Log;
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

    return buildResponse({
      status: result.status,
      statusText: result.statusText,
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

export async function readLogs() {
  try {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.from("log").select("*");

    return buildResponse({
      status: result.status,
      statusText: result.statusText,
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
