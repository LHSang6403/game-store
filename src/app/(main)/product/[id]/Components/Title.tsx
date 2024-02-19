export default function Title({
  brand,
  name,
}: {
  brand: string;
  name: string;
}) {
  return (
    <div className="absolute top-2 left-1/2 sm:w-screen sm:px-2 transform -translate-x-1/2">
      <h2 className="max-w-[650px] sm:max-w-full line-clamp-1 overflow-ellipsis text-center text-2xl font-medium text-foreground/90">
        {brand}
      </h2>
      <h1 className="max-w-[650px] sm:max-w-full line-clamp-1 sm:line-clamp-2 overflow-ellipsis text-center text-3xl font-semibold">
        {name}
      </h1>
    </div>
  );
}
