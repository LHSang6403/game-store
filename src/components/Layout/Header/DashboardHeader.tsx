"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavBar from "@/components/Layout/Header/NavBar";
import Dropdown from "@/components/Layout/Header/Dropdown";
import RangeTime from "@/components/Picker/RangeDate/RangeTime";
import DashboardSidebar from "@/app/(protected)/dashboard/Components/DashboardSidebar";
import PrimaryLogo from "@components/PrimaryLogo";
import ThemeButton from "@/components/Theme/ThemeButton";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 flex h-16 w-full items-center gap-4 overflow-hidden border-b bg-background px-4 sm:px-2">
      <nav className="flex w-full flex-row items-center gap-2 text-lg font-medium xl:hidden">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <PrimaryLogo />
        </Link>
        <div className="xl:hidden">
          <NavBar />
        </div>
      </nav>
      <div className="hidden xl:block">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-56 px-3">
            <nav className="grid gap-3 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <PrimaryLogo />
              </Link>
              <DashboardSidebar />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex w-full flex-row items-center justify-end gap-4 lg:gap-4 md:gap-2">
        <div className="sm:hidden">
          <RangeTime />
        </div>
        <ThemeButton />
        <Dropdown />
      </div>
    </header>
  );
}
