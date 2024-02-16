"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signOutHandler } from "@auth/_actions/signOut";
import { QueryClient } from "@tanstack/react-query";

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOutHandler();
      toast.success("Sign out successfully.");
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error signing out:", error);
    }
  };

  const queryClient = new QueryClient();

  return (
    <form action={handleSignOut}>
      <Button
        type="submit"
        onClick={() => {
          queryClient.removeQueries({
            queryKey: [`user-session`],
            exact: true,
          });
        }}
        className="w-full h-7 px-2"
      >
        Sign Out
      </Button>
    </form>
  );
};

export default SignOut;
