import Image from "next/image";

export default function ProductImages() {
  return (
    <>
      <div className="w-full h-fit max-h-[490px] xl:max-h-[580px] lg:max-h-[420px] sm:max-h-[270px] xl:w-[90%] sm:w-full sm:mt-10 mx-auto">
        <Image
          alt="Category"
          src="/assets/images/gamePlay/g6.png"
          className="object-contain !w-full !relative"
          layout="fill"
        />
      </div>
      <div className="w-full h-fit py-3 px-10 sm:px-4 flex flex-row items-center justify-center gap-2 overflow-auto">
        {Array.from({ length: 4 }).map((_, index: number) => (
          <div
            key={index}
            className="w-28 h-24 rounded-md p-2 border hover:bg-foreground/5 hover:scale-[1.02] transition duration-300 ease-in-out"
          >
            <Image
              alt="Category"
              src="/assets/images/gamePlay/g15.png"
              className="object-contain !w-full !relative"
              layout="fill"
            />
          </div>
        ))}
      </div>
    </>
  );
}
