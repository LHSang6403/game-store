"use client";

import PrimaryLogo from "@components/PrimaryLogo";
import Dropdown from "@components/Layout/Header/Dropdown";
import NavBar from "@components/Layout/Header/NavBar";
import SearchBar from "@components/Search/SearchBar";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  return (
    <div className="static top-0 z-30 flex h-16 w-full flex-row items-center justify-between gap-4 bg-background px-4 md:fixed md:px-6 xl:px-10">
      <div className="mr- flex items-center">
        <PrimaryLogo />
      </div>
      <div className="hidden w-full max-w-[1300px] flex-row items-center justify-around gap-6 xl:flex">
        <div
          className={`w-full ${path === "/product" ? "invisible" : ""}`}
        ></div>
        <NavBar />
        <div
          className={`w-full rounded-[9px] bg-gradient-to-r from-cpurple via-cpink to-corange p-[1.5px] ${
            path === "/product" ? "invisible" : ""
          }`}
        >
          <SearchBar />
        </div>
      </div>
      <Dropdown />
    </div>
  );
}
