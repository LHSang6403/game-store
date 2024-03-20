export default function KeyCards() {
  const keyValues = [
    {
      title: "Variety",
      description:
        "At Store, we guarantee range of products from reputable brands at competitive prices.",
    },
    {
      title: "Professional",
      description:
        "With experienced and knowledgeable staff, Store prioritizes top-notch service.",
    },
    {
      title: "Competitive",
      description:
        "Store is offering quality at the most competitive prices on the market.",
    },
    {
      title: "Quality",
      description:
        "We prioritize product and service quality, ensuring items are genuine and new.",
    },
  ];

  return (
    <div className="grid h-auto w-full grid-cols-4 gap-4 xl:grid-cols-2 sm:grid-cols-1">
      {keyValues.map((key, index: number) => (
        <KeyCard key={index} data={key} />
      ))}
    </div>
  );
}

function KeyCard({ data }: { data: { title: string; description: string } }) {
  return (
    <div className="mxauto group col-span-1 rounded-lg border border-background/10 p-2 transition duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:bg-background/10 sm:w-full">
      <hr className="w-[36%] rounded border-accent/30"></hr>
      <div className="flex h-fit w-full flex-row gap-1.5">
        <h2 className="w-fit text-6xl text-accent transition duration-300 ease-in-out group-hover:text-background">
          {data.title.charAt(0)}
        </h2>
        <div className="h-fit w-full">
          <h2 className="text-2xl font-semibold text-accent/70 transition duration-300 ease-in-out group-hover:text-background">
            {data.title.slice(1)}
          </h2>
          <p className="line-clamp-3 h-fit w-full overflow-ellipsis text-sm text-accent/50 transition duration-300 ease-in-out group-hover:text-background">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
