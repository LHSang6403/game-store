import Image from "next/image";

export default function ClientCards() {
  const clientSays = [
    {
      name: "John Doe",
      image: "/assets/images/people/male.png",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
      rating: 4,
    },
    {
      name: "John Sm.",
      image: "/assets/images/people/female.png",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna.",
      rating: 5,
    },
  ];

  return (
    <div className="gap-8 xl:flex-col flex h-fit w-full flex-row items-center justify-center">
      {clientSays.map((client, index: number) => (
        <ClientCard data={client} key={index} />
      ))}
    </div>
  );
}

function ClientCard({
  data,
}: {
  data: { name: string; image: string; review: string; rating: number };
}) {
  return (
    <div className="group flex h-fit w-[500px] flex-row justify-center gap-4 rounded-lg hover:cursor-pointer sm:w-full">
      <div className="flex flex-col gap-1">
        <Image
          className="-brightness-105 mx-auto transition duration-300 ease-in-out group-hover:brightness-105"
          src={data.image}
          alt={data.name}
          width={120}
          height={120}
        />
        <h2 className="text-2xl font-medium text-accent/90 transition duration-300 ease-in-out group-hover:text-background">
          {data.name}
        </h2>
      </div>
      <div className="mt-4 w-1/2 text-sm font-light text-accent/70 transition duration-300 ease-in-out group-hover:text-background sm:-mt-2">
        <p className="line-clamp-4 overflow-ellipsis">{data.review}</p>
        <div className="mt-2 font-medium text-accent/80 transition duration-300 ease-in-out group-hover:text-background">
          <span>Rating: </span>
          <span>{data.rating}</span>
        </div>
      </div>
    </div>
  );
}
