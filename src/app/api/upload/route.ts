import createSupabaseServerClient from "@supabase/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();

    const file = req.body;
    const filename = req.headers.get("x-vercel-filename") || "file.txt";
    const contentType = req.headers.get("content-type") || "text/plain";
    const fileType = `.${contentType.split("/")[1]}`;

    const finalName = filename.includes(fileType)
      ? filename
      : `${filename}${fileType}`;

    const { data, error } = await supabase.storage
      .from("public_files")
      .upload("/product_description/" + finalName, file!, {
        // cacheControl: "no-cache",
        // upsert: false,
        duplex: "half",
      });

    if (error) {
      console.error("Error handling POST request:", error);
      return new Response("Internal Server Error", { status: 500 });
    }

    return Response.json({
      data: "ok",
      url:
        "https://ybpsohhfffcqexnuazos.supabase.co/storage/v1/object/public/public_files/" +
        data!.path,
    });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
