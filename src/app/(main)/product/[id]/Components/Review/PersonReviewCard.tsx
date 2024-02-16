import Image from "next/image";

export default function PersonReviewCard() {
  return (
    <div className="w-[500px] sm:w-full h-fit max-h-56 bg-background border border-foreground/20 flex flex-row justify-between rounded-md overflow-hidden relative hover:scale-[1.01] hover:bg-accent/50 transition duration-300 ease-in-out">
      <div className="w-3/4 sm:w-4/6 h-full z-10 py-4 px-6 sm:py-2 sm:px-3 flex flex-col justify-between">
        <p className="text-sm line-clamp-4 overflow-ellipsis text-foreground/90">
          The product is amazing! It exceeded my expectations in every way. The
          quality is top-notch and the design is sleek and modern. I would
          highly recommend it.
        </p>
        <div className="mt-4">
          <h2 className="text-xl font-medium -mb-1">Mr. Sam</h2>
          <p className="text-foreground/80 text-sm font-light">
            Living at Silicon Valley
          </p>
        </div>
      </div>
      <div className="h-40 absolute right-0 bottom-0">
        <Image
          alt="Category"
          src="/assets/images/people/male2.png"
          className="object-contain !w-full !relative sm:pt-4"
          layout="fill"
        />
      </div>
    </div>
  );
}
