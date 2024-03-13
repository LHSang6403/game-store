"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export function PrintDialog({
  content,
  isOpen,
  onOpenChange,
}: {
  content: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  function removeElementById(htmlString, id) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = htmlString;

    const elementToRemove = wrapper.querySelector(`#${id}`);
    if (elementToRemove) {
      elementToRemove.remove();
    }

    return wrapper.innerHTML;
  }
  const modifiedHtmlString = removeElementById(content, "process-bar");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle>Printed Label</DialogTitle>
          <DialogDescription>
            This is your preview sticker paper. Click print to get the paper
            version.
          </DialogDescription>
        </DialogHeader>
        {modifiedHtmlString === "" ? (
          <>
            <Skeleton className="h-[80px] w-full rounded-xl bg-foreground/10 sm:h-[60px]" />
            <Skeleton className="h-[80px] w-full rounded-xl bg-foreground/10 sm:h-[60px]" />
            <Skeleton className="h-[80px] w-full rounded-xl bg-foreground/10 sm:h-[60px]" />
          </>
        ) : (
          <div className="max-h-[550px] w-full overflow-auto">
            <div
              dangerouslySetInnerHTML={{ __html: modifiedHtmlString ?? "" }}
              className="flex h-auto w-full justify-center"
            />
          </div>
        )}
        <DialogFooter>
          <Button
            onClick={() => {
              console.log("Print api call here");
            }}
            type="submit"
            className="text-background"
          >
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
