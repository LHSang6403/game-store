// End point: https://ybpsohhfffcqexnuazos.supabase.co/functions/v1/GHN-webhook

import { updateStateOrder } from "./order";


Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await req.json()
  console.log(data)

  return new Response(JSON.stringify({ message: "OK" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
})

