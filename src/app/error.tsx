"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  const handleClick = async () => {
    reset();
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-fit min-w-[500px] max-w-[700px] flex-col items-center justify-center rounded-xl bg-foreground/10 px-12 py-8 shadow sm:w-[90%]">
        <h1 className="mb-4 text-2xl font-bold text-primary">Game store</h1>
        <p className="mb-4 line-clamp-4 h-fit overflow-ellipsis text-center text-red-400">
          Lỗi: {error.message}
        </p>
        <div className="mt-2 flex flex-row gap-4">
          <Button
            className="bgbackgournd rounded-lg text-accent"
            onClick={handleClick}
          >
            Thử lại
          </Button>
          <Button
            className="bgbackgournd rounded-lg text-accent"
            onClick={router.back}
          >
            Trở về
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Error;
