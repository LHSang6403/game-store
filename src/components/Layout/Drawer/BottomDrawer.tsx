"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
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
          className="h-7 bg-foreground hover:bg-foreground border-foreground"
          variant="outline"
        >
          Navigation Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Navigate your app</DrawerTitle>
            <DrawerDescription>
              Just a short description of a web application.
            </DrawerDescription>
          </DrawerHeader>
          <div className="w-fit h-fit mx-auto p-4 grid grid-cols-2 gap-2 justify-center items-center">
            {navUrls.map((navUrl, index: number) => (
              <Link
                key={index}
                href={navUrl.url}
                className="h-10 w-[150px] flex justify-center items-center border mx1 rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              >
                {navUrl.name}
              </Link>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="text-background">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
