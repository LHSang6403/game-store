"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function LocationDialog({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: Function;
}) {
  const [_, setContent] = useLocalStorage("storage", {
    name: "Miền Trung & Nam",
  });

  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenChange()}>
      <DialogContent className="rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bạn ở đâu?</DialogTitle>
          <DialogDescription>
            Để chúng tôi có thể sắp xếp giao hàng đến đúng địa chỉ trong thời
            gian sớm nhất.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-2 sm:flex-col">
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              type="submit"
              onClick={() =>
                setContent({
                  name: "Miền Bắc",
                })
              }
              className="w-1/2 sm:w-full"
            >
              Miền Bắc
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              type="submit"
              onClick={() =>
                setContent({
                  name: "Miền Trung & Nam",
                })
              }
              className="w-1/2 bg-gradient-to-r from-cpurple via-cpink to-corange text-background sm:w-full"
            >
              Miền Trung và Nam
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
