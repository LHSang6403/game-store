"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@utils/types/index";
import FadeInWhenVisible from "@components/FadeInWhenVisible";

export default function LargeBlog({ data }: { data: BlogType }) {
  return (
    <FadeInWhenVisible>
      <Link
        href={`/blog/${data.id}`}
        className="h-full w-full max-w-full overflow-hidden rounded-lg from-[#9633ed51] via-[#f22b9c4c] to-[#fd7c3654] text-foreground/90 transition duration-300 hover:scale-[1.02] hover:cursor-pointer hover:bg-gradient-to-r hover:shadow-xl md:w-1/2 md:max-w-[800px]"
      >
        <div className="h-auto max-h-52 w-full overflow-hidden rounded-lg md:h-56 md:max-h-80">
          <Image
            alt="A blog"
            src={
              process.env.NEXT_PUBLIC_SUPABASE_BUCKET_PATH + data.thumbnails[0]
            }
            className="!relative h-[100%] max-w-[100%] object-cover"
            priority
            quality={100}
            fill
          />
        </div>
        <div className="h-fit w-full p-1.5">
          <h2 className="line-clamp-2 h-fit overflow-ellipsis font-medium leading-6">
            {data.title}
          </h2>
          <p className="mt-0.5 line-clamp-3 h-fit overflow-ellipsis text-sm font-light">
            {data.description}
          </p>
        </div>
      </Link>
    </FadeInWhenVisible>
  );
}
