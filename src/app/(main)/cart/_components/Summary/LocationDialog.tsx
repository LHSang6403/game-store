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
      <DialogContent className="max-w-[425px] rounded-md md:w-full">
        <DialogHeader>
          <DialogTitle>Bạn ở đâu?</DialogTitle>
          <DialogDescription>
            Để chúng tôi có thể sắp xếp giao hàng đến đúng địa chỉ trong thời
            gian sớm nhất.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 md:flex-row">
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              type="submit"
              onClick={() =>
                setContent({
                  name: "Miền Bắc",
                })
              }
              className="w-full md:w-1/2"
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
              className="w-full bg-gradient-to-r from-cpurple via-cpink to-corange text-background md:w-1/2"
            >
              Miền Trung và Nam
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
}
