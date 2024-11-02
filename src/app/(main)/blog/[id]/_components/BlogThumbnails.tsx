"use client";

import Image from "next/image";

export default function BlogThumbnails({ thumbs }: { thumbs: string[] }) {
  return (
    <div className="flex w-full flex-row justify-center gap-4 xl:px-6 sm:flex-col sm:px-2">
      {thumbs.slice(0, 2).map((thumb, index) => (
        <div
          key={index}
          className="max-w-[500px] overflow-hidden rounded-lg shadow-xl md:max-w-full"
        >
          <Image
            src={
              process.env.NEXT_PUBLIC_SUPABASE_URL +
              "/storage/v1/object/public/public_files/" +
              thumb
            }
            alt="Blog Thumbnail"
            className="object-fit !relative h-[100%] max-w-[100%]"
            priority
            quality={100}
            fill
          />
        </div>
      ))}
    </div>
  );
}
