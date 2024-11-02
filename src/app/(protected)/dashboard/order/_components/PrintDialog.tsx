"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useMemo } from "react";

export function PrintDialog({
  content,
  isOpen,
  onOpenChange,
}: {
  content: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const removeElementById = useCallback((htmlString: string, id: string) => {
    const wrapper = document?.createElement("div");
    wrapper.innerHTML = htmlString;

    const elementToRemove = wrapper.querySelector(`#${id}`);
    if (elementToRemove) {
      elementToRemove.remove();
    }

    return wrapper.innerHTML;
  }, []);

  const modifiedHtmlString = useMemo(() => {
    return removeElementById(content, "process-bar");
  }, [content, removeElementById]);

  const handlePrint = useCallback(() => {
    console.log("Print api, call here");
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full rounded-md md:w-full">
        <DialogHeader>
          <DialogTitle>Xem trước nhãn in</DialogTitle>
        </DialogHeader>
        {modifiedHtmlString === "" ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[60px] w-full rounded-xl bg-foreground/10 md:h-[80px]" />
            <Skeleton className="h-[60px] w-full rounded-xl bg-foreground/10 md:h-[80px]" />
            <Skeleton className="h-[60px] w-full rounded-xl bg-foreground/10 md:h-[80px]" />
          </div>
        ) : (
          <div className="max-h-[550px] w-full overflow-auto !text-black">
            <div
              dangerouslySetInnerHTML={{ __html: modifiedHtmlString ?? "" }}
              className="flex h-auto w-full justify-center"
            />
          </div>
        )}
        <DialogFooter>
          <Button
            onClick={handlePrint}
            type="submit"
            className="w-full text-background"
          >
            In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
