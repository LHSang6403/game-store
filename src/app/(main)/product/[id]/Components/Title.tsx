export default function Title({
  brand,
  name,
}: {
  brand: string;
  name: string;
}) {
  return (
    <div
      id="main-title"
      className="absolute left-1/2 top-2 z-10 -translate-x-1/2 transform sm:w-screen sm:px-2"
    >
      <h2 className="line-clamp-1 max-w-[650px] overflow-ellipsis text-center text-2xl font-medium text-foreground/90 sm:max-w-full">
        {brand}
      </h2>
      <h1 className="line-clamp-1 max-w-[650px] overflow-ellipsis bg-gradient-to-r from-cpurple via-cpink to-corange bg-clip-text text-center text-3xl font-semibold text-transparent sm:line-clamp-2 sm:max-w-full">
        {name}
      </h1>
    </div>
  );
}
