"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@utils/types/index";
import FadeInWhenVisible from "@components/FadeInWhenVisible";
import ImageWrapper from "@components/ImageWrapper";

export default function Blog({ data }: { data: BlogType }) {
  return (
    <FadeInWhenVisible>
      <Link
        className="rounded-lg from-[#9633ed51] via-[#f22b9c4c] to-[#fd7c3654] transition duration-300 hover:scale-[1.02] hover:cursor-pointer hover:bg-gradient-to-r hover:shadow-xl"
        href={`/blog/${data.id}`}
      >
        <div className="flex h-full w-full flex-col overflow-hidden text-foreground/90 ">
          <div className="h-36 max-h-44 w-full overflow-hidden rounded-lg md:h-auto md:max-h-52">
            <Image
              alt="A blog"
              src={
                process.env.NEXT_PUBLIC_SUPABASE_URL +
                "/storage/v1/object/public/public_files/" +
                data.thumbnails[0]
              }
              className="object-fit !relative h-[100%] max-w-[100%]"
              priority
              quality={100}
              fill
            />
          </div>
          {/* <ImageWrapper
            src={
              process.env.NEXT_PUBLIC_SUPABASE_URL +
              "/storage/v1/object/public/public_files/" +
              data.thumbnails[0]
            }
            alt="blog"
            width={400}
            height={350}
            isLoading={!data.thumbnails[0]}
            className="h-36 w-full md:h-52"
            customLoadingClassName="rounded-lg rounded-tl-[24px]"
          /> */}
          <div className="h-fit w-full p-1.5">
            <h2 className="line-clamp-1 h-fit overflow-ellipsis font-medium leading-6">
              {data.title}
            </h2>
            <p className="mt-0.5 line-clamp-3 h-fit overflow-ellipsis text-sm font-light">
              {data.description}
            </p>
          </div>
        </div>
      </Link>
    </FadeInWhenVisible>
  );
}
``;
