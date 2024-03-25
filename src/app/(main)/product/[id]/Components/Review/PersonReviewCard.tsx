import Image from "next/image";

export default function PersonReviewCard() {
  return (
    <div className="relative flex h-fit max-h-56 w-[500px] flex-row justify-between overflow-hidden rounded-md border border-foreground/20 bg-background transition duration-300 ease-in-out hover:scale-[1.01] hover:bg-accent/50 sm:w-full">
      <div className="z-10 flex h-full w-3/4 flex-col justify-between px-6 py-4 sm:w-4/6 sm:px-3 sm:py-2">
        <p className="line-clamp-4 overflow-ellipsis text-sm text-foreground/90">
          The product is amazing! It exceeded my expectations in every way. The
          quality is top-notch and the design is sleek and modern. I would
          highly recommend it.
        </p>
        <div className="mt-4">
          <h2 className="-mb-1 text-xl font-medium">Mr. Sam</h2>
          <p className="text-sm font-light text-foreground/80">
            Living at Silicon Valley
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 h-40">
        <Image
          alt="Category"
          src="/assets/images/people/male2.png"
          className="sm:pt-4 sm:opacity-90"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
