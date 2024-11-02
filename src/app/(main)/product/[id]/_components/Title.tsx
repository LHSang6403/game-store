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
      className="md:px-0px-2 absolute left-1/2 top-2 z-10 w-screen -translate-x-1/2 transform md:w-full"
    >
      <h2 className="line-clamp-1 max-w-full overflow-ellipsis text-center text-2xl font-medium text-foreground/90 md:max-w-[650px]">
        {brand}
      </h2>
      <h1 className="line-clamp-2 max-w-full overflow-ellipsis bg-gradient-to-r from-cpurple via-cpink to-corange bg-clip-text text-center text-3xl font-semibold text-transparent md:line-clamp-1 md:max-w-[650px]">
        {name}
      </h1>
    </div>
  );
}
