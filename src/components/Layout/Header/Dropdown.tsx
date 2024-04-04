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
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Dropdown() {
  const { session, removeSession } = useSession();
  const router = useRouter();

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-9 px-2" variant="outline">
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
                    process.env.NEXT_PUBLIC_SUPABASE_URL +
                    "/storage/v1/object/public/public_files/" +
                    session.image
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
            <div
              aria-label="Toggle Dark Mode"
              className="flex h-full w-full items-center justify-start"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {resolvedTheme === "dark" ? (
                <SunIcon className="h-4 w-4 text-orange-300" />
              ) : (
                <MoonIcon className="h-4 w-4 text-slate-800" />
              )}
              <span className="ml-2">
                {resolvedTheme === "dark" ? "Màu sáng" : "Màu tối"}
              </span>
            </div>
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
                toast.success("Đăng xuất thành công.");
              } else {
                toast.error("Đã có lỗi xãy ra khi đăng xuất.");
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
