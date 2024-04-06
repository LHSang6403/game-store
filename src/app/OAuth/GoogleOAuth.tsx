"use client";

import { Button } from "@/components/ui/button";
import createSupabaseBrowerClient from "@supabase/client";
import { toast } from "sonner";

export async function signInWithGoogle() {
  const supabase = createSupabaseBrowerClient();

  try {
    const result = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/OAuth/callback`,
      },
    });

    console.log(result);
  } catch (error: any) {
    toast.error(error.message);
  }
}

export default function GoogleOAuth() {
  return (
    <Button
      className="w-full bg-background text-foreground hover:text-accent"
      onClick={signInWithGoogle}
    >
      Đăng nhập với Google
    </Button>
  );
}
