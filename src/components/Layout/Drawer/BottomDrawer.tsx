"use client";

import { Button } from "@components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@components/ui/drawer";
import NavBar from "@components//Layout/Header/NavBar";

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
          <div className="w-full h-fit p-4 flex justify-center items-center">
            <NavBar />
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
