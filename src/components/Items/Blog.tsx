import Image from "next/image";
import Link from "next/link";
import { BlogType } from "@utils/types/index";

export default function Blog({ data }: { data: BlogType }) {
  return (
    <Link href={`/blog/${data.id}`}>
      <div className="flex h-full w-full flex-col overflow-hidden text-foreground/90 hover:cursor-pointer">
        <div className="h-36 w-full overflow-hidden rounded-lg shadow-xl xl:h-auto xl:max-h-52 sm:max-h-44">
          <Image
            alt="A blog"
            src={
              process.env.NEXT_PUBLIC_SUPABASE_URL +
              "/storage/v1/object/public/public_files/" +
              data.thumbnails[0]
            }
            className="z-0 h-full w-full object-cover"
            width={400}
            height={200}
          />
        </div>
        <div className="h-fit w-full p-1">
          <h2 className="mt-1 line-clamp-1 h-fit overflow-ellipsis font-semibold leading-6">
            {data.title}
          </h2>
          <p className="mt-1 line-clamp-3 h-fit overflow-ellipsis text-sm font-light">
            {data.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
``;
