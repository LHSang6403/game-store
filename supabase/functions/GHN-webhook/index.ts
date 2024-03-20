import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// End point: https://ybpsohhfffcqexnuazos.supabase.co/functions/v1/GHN-webhook

Deno.serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase_url = Deno.env.get("NEXT_PUBLIC_SUPABASE_URL") ?? "";
    const supabase_key = Deno.env.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") ?? "";

    const supabase = createClient(supabase_url, supabase_key);

    const data = await req.json();
    const updatedState = data.Status;
    const orderId = data.OrderCode;

    const { data: responseData, error } = await supabase
      .from("order")
      .update({ state: updatedState.toString() })
      .eq("shipment_label_code", orderId.toString());

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
