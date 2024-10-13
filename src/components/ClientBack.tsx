"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ClientBack() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="group flex w-fit items-center rounded-md bg-btn-background py-2 pl-0 pr-4 text-sm text-foreground no-underline hover:bg-btn-background"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Trở về
    </Button>
  );
}
