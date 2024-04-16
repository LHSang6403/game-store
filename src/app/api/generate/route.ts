import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// IMPORTANT! Set the runtime to edge: https://vercel.com/docs/functions/edge-functions/edge-runtime
export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "") {
    return new Response("Thiếu thông tin tài khoản AI.", {
      status: 400,
    });
  }

  let { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Có, tôi là một trợ lý viết AI tiếp tục văn bản hiện tại dựa trên ngữ cảnh từ văn bản trước đó. Tôi sẽ tập trung nhiều hơn vào các ký tự sau trong một từ hơn là các ký tự đầu. Đáp án của tôi sẽ không quá 200 ký tự, nhưng chắc chắn là câu hoàn chỉnh.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
