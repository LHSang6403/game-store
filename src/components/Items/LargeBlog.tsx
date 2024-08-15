import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@utils/types/index";

export default function LargeBlog({ data }: { data: BlogType }) {
  return (
    <Link
      href={`/blog/${data.id}`}
      className="h-full w-1/2 max-w-[800px] overflow-hidden rounded-lg from-[#9633ed51] via-[#f22b9c4c] to-[#fd7c3654] text-foreground/90 transition duration-300 hover:scale-[1.02] hover:cursor-pointer hover:cursor-pointer hover:bg-gradient-to-r hover:shadow-xl xl:w-full xl:max-w-full"
    >
      <div className="h-56 w-full overflow-hidden rounded-lg xl:h-auto xl:max-h-80 sm:max-h-52">
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
      <div className="h-fit w-full p-1.5">
        <h2 className="line-clamp-2 h-fit overflow-ellipsis font-medium leading-6">
          {data.title}
        </h2>
        <p className="mt-0.5 line-clamp-3 h-fit overflow-ellipsis text-sm font-light">
          {data.description}
        </p>
      </div>
    </Link>
  );
}
