import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// End point: https://ybpsohhfffcqexnuazos.supabase.co/functions/v1/GHTK-webhook

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      "https://ybpsohhfffcqexnuazos.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlicHNvaGhmZmZjcWV4bnVhem9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyOTYxNTMsImV4cCI6MjAyMjg3MjE1M30.lNR-z_qltwnzOroh3Ooc7uybSEqaX_gnZ3WX17eEFLc"
    );

    const data = await req.json();

    const labelId = data.label_id;
    const statusId = data.status_id;

    let updatedState:
      | "pending"
      | "shipping"
      | "delivered"
      | "canceled"
      | "returned"
      | null = null;

    if (Number(statusId) === -1) {
      updatedState = "canceled";
    } else if (1 <= Number(statusId) && Number(statusId) <= 3) {
      updatedState = "pending";
    } else if (Number(statusId) === 4) {
      updatedState = "shipping";
    } else if (Number(statusId) === 5 || Number(statusId) === 45) {
      updatedState = "delivered";
    } else if (Number(statusId) === 21) {
      updatedState = "returned";
    } else {
      updatedState = "pending";
    }

    const { data: responseData, error } = await supabase
      .from("order")
      .update({ state: updatedState })
      .eq("shipment_label_code", labelId.toString());

    return new Response(JSON.stringify({ message: "OK" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
