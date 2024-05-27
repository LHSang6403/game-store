"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import navUrls from "../Header/navUrls.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, SessionState } from "@/zustand/useSession";
import React from "react";

export default function BottomDrawer() {
  const path = usePathname();
  const { session } = useSession() as SessionState;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="h-full w-full border-foreground bg-foreground hover:bg-foreground"
          variant="outline"
        >
          Trang khác
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pb-6">
          <DrawerHeader>
            <DrawerTitle>Chuyển trang</DrawerTitle>
            <DrawerDescription>
              Khám phá các trang khác của 2Win.
            </DrawerDescription>
          </DrawerHeader>
          <div className="mx-auto grid h-fit w-fit grid-cols-2 items-center justify-center gap-2 p-4 sm:w-full">
            {navUrls.map((navUrl, index) => (
              <>
                {navUrl.permission === "Staff" ? (
                  <>
                    {session && "role" in session && (
                      <DrawerClose key={index} asChild>
                        <Link
                          href={navUrl.url}
                          className={`${
                            path === navUrl.url
                              ? "bg-gradient-to-r from-cpurple via-cpink to-corange text-background"
                              : "bg-background text-foreground"
                          } flex h-10 w-32 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors sm:w-full`}
                        >
                          <span>{navUrl.name}</span>
                        </Link>
                      </DrawerClose>
                    )}
                  </>
                ) : (
                  <DrawerClose key={index} asChild>
                    <Link
                      href={navUrl.url}
                      className={`${
                        path === navUrl.url
                          ? "bg-gradient-to-r from-cpurple via-cpink to-corange text-background"
                          : "bg-background text-foreground"
                      } flex h-10 w-32 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors sm:w-full`}
                    >
                      <span>{navUrl.name}</span>
                    </Link>
                  </DrawerClose>
                )}
              </>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
