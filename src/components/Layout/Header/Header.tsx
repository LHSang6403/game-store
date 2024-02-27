"use client";

import PrimaryLogo from "@components/PrimaryLogo";
import Dropdown from "@components/Layout/Header/Dropdown";
import NavBar from "@components/Layout/Header/NavBar";
import ThemeButton from "@components/Theme/ThemeButton";
import SearchBar from "@components/Search/SearchBar";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  return (
    <div className="fixed top-0 z-30 flex h-16 w-full flex-row justify-around gap-3 bg-background px-10 xl:static xl:justify-between sm:px-4">
      <div className="mr-auto flex items-center">
        <PrimaryLogo />
      </div>
      <nav className="flex w-full flex-row items-center justify-center gap-6 xl:hidden">
        <div className={`w-52 ${path === "/product" ? "hidden" : ""}`}></div>
        <NavBar />
        <div className={`w-52 ${path === "/product" ? "hidden" : ""}`}>
          <SearchBar />
        </div>
      </nav>
      <div className="flex items-center gap-2">
        <ThemeButton />
        <Dropdown />
      </div>
    </div>
  );
}
