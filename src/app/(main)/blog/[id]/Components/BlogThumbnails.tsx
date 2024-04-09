"use client";

import Image from "next/image";

export default function BlogThumbnails({ thumbs }: { thumbs: string[] }) {
  return (
    <div className="flex flex-row justify-center gap-4">
      {thumbs.map((thumb, index) => (
        <Image
          key={index}
          src={
            process.env.NEXT_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/public_files/" +
            thumb
          }
          alt="Blog Thumbnail"
          width={500}
          height={500}
        />
      ))}
    </div>
  );
}
