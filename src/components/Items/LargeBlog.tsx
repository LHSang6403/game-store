import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@utils/types/index";

export default function LargeBlog({ data }: { data: BlogType }) {
  return (
    <Link
      href={`/blog/${data.id}`}
      className="h-full w-1/2 max-w-[800px] overflow-hidden text-foreground/90 hover:cursor-pointer xl:w-full xl:max-w-full"
    >
      <div className="h-56 w-full overflow-hidden rounded-lg shadow-xl xl:h-auto xl:max-h-80 sm:max-h-52">
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
        <h2 className="mt-1 line-clamp-2 h-fit overflow-ellipsis font-semibold leading-6">
          {data.title}
        </h2>
        <p className="mt-1 line-clamp-3 h-fit overflow-ellipsis text-sm font-extralight">
          {data.description}
        </p>
      </div>
    </Link>
  );
}
