import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@utils/types/index";

export default function Blog({ data }: { data: BlogType }) {
  return (
    <Link
      href={`/blog/${data.id}`}
      className="h-fit w-48 overflow-hidden bg-foreground/5 text-foreground/90 transition duration-300 ease-in-out hover:scale-[1.02] hover:bg-foreground/10 hover:text-foreground sm:w-full"
    >
      <div className="h-36 w-48 sm:h-28 sm:w-full">
        <Image
          alt="A blog"
          src={
            process.env.NEXT_PUBLIC_SUPABASE_URL +
            "/storage/v1/object/public/public_files/" +
            data.thumbnails[0]
          }
          className="z-0 h-full w-full"
          width={200}
          height={200}
        />
      </div>
      <div className="h-fit w-full p-1">
        <h2 className="line-clamp-2 h-12 overflow-ellipsis text-lg font-semibold leading-6">
          {data.title}
        </h2>
        <p className="line-clamp-3 h-fit overflow-ellipsis text-sm font-medium">
          {data.description}
        </p>
      </div>
    </Link>
  );
}
