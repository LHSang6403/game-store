import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@utils/types/index";

export default function Blog({ data }: { data: BlogType }) {
  return (
    <Link
      href={`/blog/${data.id}`}
      className="h-full w-full overflow-hidden text-foreground/90 hover:cursor-pointer sm:w-full"
    >
      <div className="h-36 w-full xl:h-44 sm:h-32">
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
        <p className="line-clamp-3 h-fit overflow-ellipsis text-sm font-light">
          {data.description}
        </p>
      </div>
    </Link>
  );
}
