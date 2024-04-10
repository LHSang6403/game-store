import { JSONContent } from "novel";

export function parseStringToJSONContent(content: string) {
  const parsedContent: JSONContent =
    typeof content === "string" ? JSON.parse(content) : content;

  return parsedContent;
}
