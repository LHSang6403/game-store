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

export default function BottomDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="h-full w-full border-foreground bg-foreground hover:bg-foreground"
          variant="outline"
        >
          Navigation Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pb-6">
          <DrawerHeader>
            <DrawerTitle>Navigate your app</DrawerTitle>
            <DrawerDescription>
              Just a short description of a web application.
            </DrawerDescription>
          </DrawerHeader>
          <div className="mx-auto grid h-fit w-fit grid-cols-2 items-center justify-center gap-2 p-4">
            {navUrls.map((navUrl, index: number) => (
              <DrawerClose key={index} asChild>
                <Link
                  href={navUrl.url}
                  className="mx1 hover:text-accent-foreground focus:text-accent-foreground flex h-10 w-[150px] items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  {navUrl.name}
                </Link>
              </DrawerClose>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
