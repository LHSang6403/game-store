import ReviewDialog from "./ReviewDialog";
import PersonReviewCard from "./PersonReviewCard";
import ReviewTable from "./ReviewTable";

export default function ProductReview({ comments }: { comments: string[] }) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex h-full w-full flex-row items-center justify-center gap-6 overflow-auto xl:flex-col sm:gap-4 sm:px-2">
        <PersonReviewCard />
        <PersonReviewCard />
      </div>
      <div className="flex h-fit w-full flex-col items-center justify-center rounded-3xl bg-background sm:p-2">
        <ReviewTable />
        <ReviewDialog />
      </div>
    </div>
  );
}
