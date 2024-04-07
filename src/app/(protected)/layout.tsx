import { readUserSession } from "@app/_actions/user";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await readUserSession();
  if (!session.data?.data) return redirect("/auth");

  return <div className="min-h-screen w-full">{children}</div>;
}
