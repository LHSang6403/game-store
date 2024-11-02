"use client";

import { useRouter } from "next/navigation";
import { LogOut, UserRoundCog } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { handleSignOut } from "@/app/auth/_actions/signOut";
import { useSession, SessionState } from "@/zustand/useSession";
import { toast } from "sonner";
import Image from "next/image";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Dropdown() {
  const { session, removeSession } = useSession() as SessionState;
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="rounded-md bg-gradient-to-r from-cpurple via-cpink to-corange p-[1.5px] md:rounded-lg">
          <Button
            className="h-9 border-none px-2 outline-none ring-0"
            variant="outline"
          >
            <span>Menu</span>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-3 w-56 bg-background">
        <DropdownMenuLabel>
          <span className="bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-transparent">
            2Win Games
          </span>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {session !== null && (
            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="focus:bg-background"
            >
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
        </DropdownMenuGroup>
        {session === null ? (
          <DropdownMenuItem onClick={() => router.push("/auth")}>
            <LogOut className="mr-2 h-4 w-4" />
            Đăng nhập
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={async () => {
              const result = await handleSignOut();
              if (!result.error) {
                toast.success("Đăng xuất thành công.");
                router.push("/auth");
                removeSession();
              } else {
                toast.error("Đã có lỗi xãy ra khi đăng xuất.");
              }
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Đăng xuất
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
