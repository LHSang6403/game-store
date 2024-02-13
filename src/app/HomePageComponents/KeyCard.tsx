export default function KeyCard({
  data,
}: {
  data: { title: string; description: string };
}) {
  return (
    <div className="group w-1/4 rounded-lg p-2 border border-background/10 hover:scale-[1.02] hover:cursor-pointer hover:bg-background/10 transition duration-300 ease-in-out">
      <hr className="w-[36%] border-accent/30 rounded"></hr>
      <div className="flex flex-row gap-1.5">
        <h2 className="text-6xl text-accent group-hover:text-background transition duration-300 ease-in-out">
          {data.title.charAt(0)}
        </h2>
        <div>
          <h2 className="text-2xl font-semibold text-accent/70 group-hover:text-background transition duration-300 ease-in-out">
            {data.title.slice(1)}
          </h2>
          <p className="text-sm text-accent/50 group-hover:text-background transition duration-300 ease-in-out">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
