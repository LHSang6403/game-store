import Image from "next/image";

export default function ClientCard({
  data,
}: {
  data: { name: string; image: string; review: string; rating: number };
}) {
  return (
    <div className="w-[500px] h-fit group rounded-lg flex flex-row justify-center gap-4 hover:cursor-pointer">
      <div className="flex flex-col gap-1">
        <Image
          className="mx-auto -brightness-105 group-hover:brightness-105 transition duration-300 ease-in-out"
          src={data.image}
          alt={data.name}
          width={120}
          height={120}
        />
        <h2 className="text-2xl font-medium text-accent/90 group-hover:text-background transition duration-300 ease-in-out">
          {data.name}
        </h2>
      </div>
      <div className="mt-4 w-1/2 font-light text-sm text-accent/70 group-hover:text-background transition duration-300 ease-in-out">
        <p>{data.review}</p>
        <div className="mt-2 font-medium text-accent/80 group-hover:text-background transition duration-300 ease-in-out">
          <span>Rating: </span>
          <span>{data.rating}</span>
        </div>
      </div>
    </div>
  );
}
