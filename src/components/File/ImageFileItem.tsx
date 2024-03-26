"use client";
import Image from "next/image";

export default function ImageFileItem({
  image,
  name,
  removeHandler,
}: {
  image: string;
  name: string;
  removeHandler: () => void;
}) {
  return (
    <div className="group h-fit w-16 overflow-hidden hover:cursor-pointer">
      <div className="relative flex h-12 items-center justify-center overflow-hidden rounded-lg border p-1">
        <Image src={image} alt="Product image" width={70} height={70} />
        <div className="absolute left-0 top-0 hidden h-full w-full items-center justify-center bg-foreground/20 group-hover:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={removeHandler}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <span className="mt-0.5 line-clamp-1 block h-4 overflow-ellipsis px-1 text-[12px]">
        {name}
      </span>
    </div>
  );
}
