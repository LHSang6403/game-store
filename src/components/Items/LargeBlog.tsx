import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@utils/types/index";

export default function LargeBlog({ data }: { data: BlogType }) {
  return (
    <Link
      href={`/blog/${data.id}`}
      className="h-full w-1/2 max-w-[800px] overflow-hidden text-foreground/90 hover:cursor-pointer xl:w-full"
    >
      <div className="h-80 w-full xl:h-72">
        <Image
          alt="A blog"
          src={
            process.env.NEXT_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/public_files/" +
            data.thumbnails[0]
          }
          className="z-0 h-full w-full object-cover"
          width={200}
          height={200}
        />
      </div>
      <div className="h-fit w-full p-1">
        <h2 className="line-clamp-2 h-fit overflow-ellipsis text-lg font-semibold leading-6">
          {data.title}
        </h2>
        <p className="line-clamp-3 h-fit overflow-ellipsis text-sm font-extralight">
          {data.description}
        </p>
      </div>
    </Link>
  );
}
