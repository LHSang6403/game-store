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
    <div className="w-full h-auto grid grid-cols-4 xl:grid-cols-2 sm:grid-cols-1 gap-4">
      {keyValues.map((key, index: number) => (
        <KeyCard key={index} data={key} />
      ))}
    </div>
  );
}

function KeyCard({ data }: { data: { title: string; description: string } }) {
  return (
    <div className="group col-span-1 sm:w-full mxauto rounded-lg p-2 border border-background/10 hover:scale-[1.02] hover:cursor-pointer hover:bg-background/10 transition duration-300 ease-in-out">
      <hr className="w-[36%] border-accent/30 rounded"></hr>
      <div className="w-full h-fit flex flex-row gap-1.5">
        <h2 className="w-fit text-6xl text-accent group-hover:text-background transition duration-300 ease-in-out">
          {data.title.charAt(0)}
        </h2>
        <div className="w-full h-fit">
          <h2 className="text-2xl font-semibold text-accent/70 group-hover:text-background transition duration-300 ease-in-out">
            {data.title.slice(1)}
          </h2>
          <p className="w-full h-fit overflow-ellipsis line-clamp-3 text-sm text-accent/50 group-hover:text-background transition duration-300 ease-in-out">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
