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
import React, { useCallback } from "react";

export default function BottomDrawer() {
  const path = usePathname();
  const { session } = useSession() as SessionState;

  const renderNavigationLink = useCallback(
    (
      navUrl: { name: string; url: string; permission: string },
      path: string
    ) => {
      const isActive = path === navUrl.url;
      return (
        <DrawerClose asChild>
          <Link
            href={navUrl.url}
            className={`${
              isActive
                ? "bg-gradient-to-r from-cpurple via-cpink to-corange text-background"
                : "bg-background text-foreground"
            } flex h-10 w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors md:w-32`}
          >
            <span>{navUrl.name}</span>
          </Link>
        </DrawerClose>
      );
    },
    []
  );

  const renderStaffNavigationLink = useCallback(
    (
      navUrl: { name: string; url: string; permission: string },
      path: string,
      session: any
    ) => {
      if (navUrl.permission === "Staff" && session && "role" in session) {
        return renderNavigationLink(navUrl, path);
      }
      return null;
    },
    [session]
  );

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
          <div className="mx-auto grid h-fit w-full grid-cols-2 items-center justify-center gap-2 p-4 md:w-fit">
            {navUrls.map((navUrl, index) => (
              <React.Fragment key={index}>
                {navUrl.permission === "Staff" ? (
                  <>{renderStaffNavigationLink(navUrl, path, session)}</>
                ) : (
                  <>{renderNavigationLink(navUrl, path)}</>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
