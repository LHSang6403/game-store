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
        <div className="max-h-[550px] w-full overflow-auto">
          <div
            dangerouslySetInnerHTML={{ __html: modifiedHtmlString ?? "" }}
            className="flex h-auto w-full justify-center"
          />
        </div>
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
