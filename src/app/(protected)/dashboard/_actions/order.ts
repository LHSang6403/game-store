"use server";

import createSupabaseServerClient from "@supabase/server";
import type { OrderType } from "@utils/types/index";
import { updateStorageQuantityByProductId } from "@/app/_actions/storage";
import { updateSoldQuantityByProductId } from "@/app/_actions/product";


