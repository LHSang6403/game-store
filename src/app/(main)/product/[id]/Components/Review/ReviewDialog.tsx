"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReviewForm from "./ReviewForm";

export default function ReviewDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="submit"
          className="w-fit sm:w-full bg-foreground text-background"
        >
          Write a review
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[550px] sm:w-[96%] sm:mx-auto rounded-md">
        <DialogHeader>
          <DialogTitle>Share your review</DialogTitle>
          <DialogDescription>
            Create your point of view here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <ReviewForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
