export default function Title() {
  return (
    <div className="absolute top-2 left-1/2 sm:w-screen transform -translate-x-1/2">
      <h2 className="max-w-[650px] sm:max-w-full line-clamp-1 overflow-ellipsis text-center text-2xl font-medium text-foreground/90">
        Brand Name
      </h2>
      <h1 className="max-w-[650px] sm:max-w-full line-clamp-1 sm:line-clamp-2 overflow-ellipsis text-center text-3xl font-semibold">
        Product Name max width 650px, with high-end features
      </h1>
    </div>
  );
}
