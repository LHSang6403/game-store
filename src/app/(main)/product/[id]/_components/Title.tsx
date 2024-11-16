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
      className="absolute left-1/2 top-2 z-10 w-full -translate-x-1/2 transform px-2 md:px-0"
    >
      <h2 className="line-clamp-1 overflow-ellipsis text-center text-2xl font-medium text-foreground/90 md:text-3xl">
        {brand}
      </h2>
      <h1 className="line-clamp-2 overflow-ellipsis bg-gradient-to-r from-cpurple via-cpink to-corange bg-clip-text text-center text-3xl font-semibold text-transparent md:line-clamp-1 md:text-4xl">
        {name}
      </h1>
    </div>
  );
}
