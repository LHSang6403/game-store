"use client";

import PrimaryLogo from "@components/PrimaryLogo";
import Dropdown from "@components/Layout/Header/Dropdown";
import NavBar from "@components/Layout/Header/NavBar";
import SearchBar from "@components/Search/SearchBar";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();

  return (
    <div className="fixed top-0 z-30 flex h-16 w-full flex-row items-center justify-between gap-4 bg-background px-10 xl:static xl:justify-between xl:px-6 sm:px-4">
      <div className="mr- flex items-center">
        <PrimaryLogo />
      </div>
      <div className="flex w-full max-w-[1300px] flex-row items-center justify-around gap-6 xl:hidden">
        <div
          className={`w-full ${path === "/product" ? "invisible" : ""}`}
        ></div>
        <NavBar />
        <div
          className={`w-full rounded-[9px] bg-gradient-to-r from-[#9733ED] via-[#F22B9C] to-[#FD7A36] p-[1.5px] ${
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
