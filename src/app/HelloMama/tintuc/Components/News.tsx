import Image from "next/image";

export default function News({
  each,
}: {
  each: { image: string; title: string; description: string };
}) {
  return (
    <div className="h-fit max-h-[650px] w-[380px] sm:w-[98%]">
      <div className="h-fit w-full">
        <Image
          alt="Sản phẩm"
          src={each.image}
          className="object-fit !relative !w-full xl:object-cover"
          layout="fill"
          quality={100}
        />
      </div>
      <h3 className="my-3 line-clamp-3 overflow-ellipsis text-center text-xl font-medium">
        {each.title}
      </h3>
      <p className="line-clamp-5 max-w-80 overflow-ellipsis text-sm font-light text-[#9D9B9B] sm:text-center">
        {each.description}
      </p>
    </div>
  );
}
