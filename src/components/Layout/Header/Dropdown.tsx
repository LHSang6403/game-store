"use client";

import { useRouter } from "next/navigation";
import { LogOut, Settings, UserRoundCog } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { signOutHandler } from "@/app/auth/_actions/signOut";
import { useSession } from "@/zustand/useSession";
import { toast } from "sonner";
import Image from "next/image";

export default function Dropdown() {
  const { session, removeSession } = useSession();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 px-2" variant="outline">
          Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-3 w-56 bg-background">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          {session !== null && (
            <DropdownMenuItem className="focus:bg-background">
              <div className="-ml-0.5 mr-1.5 flex h-5 w-5 justify-center rounded-full border p-[1px]">
                <Image
                  src={
                    session?.image
                      ? process.env.NEXT_PUBLIC_SUPABASE_URL +
                        "/storage/v1/object/public/public_files/" +
                        session.image
                      : "https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-avatar-vector-icon-white-background-png-image_1870181.jpg"
                  }
                  alt="profile"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              </div>
              {session.name}
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <UserRoundCog className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {session === null ? (
          <DropdownMenuItem onClick={() => router.push("/auth")}>
            <LogOut className="mr-2 h-4 w-4" />
            Log in
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={async () => {
              const result = await signOutHandler();
              if (!result.error) {
                removeSession();
                toast.success("You have been logged out.");
              } else {
                toast.error("An error occurred. Please try again.");
              }
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
