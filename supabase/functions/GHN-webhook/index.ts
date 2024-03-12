import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// import "https://deno.land/x/dotenv/load.ts";

// End point: https://ybpsohhfffcqexnuazos.supabase.co/functions/v1/GHN-webhook
Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    // const supabase = createClient(
    //   Deno.env.get("NEXT_PUBLIC_SUPABASE_URL") ?? "",
    //   Deno.env.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") ?? ""
    // );

    const supabase = createClient(
      "https://ybpsohhfffcqexnuazos.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlicHNvaGhmZmZjcWV4bnVhem9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyOTYxNTMsImV4cCI6MjAyMjg3MjE1M30.lNR-z_qltwnzOroh3Ooc7uybSEqaX_gnZ3WX17eEFLc"
    );

    const data = await req.json();
    const updatedState = data.Status;
    const orderId = data.OrderCode;

    const { data: responseData, error } = await supabase
      .from("order")
      .update({ state: updatedState.toString() })
      .eq("shipment_label_code", orderId.toString());

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

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
