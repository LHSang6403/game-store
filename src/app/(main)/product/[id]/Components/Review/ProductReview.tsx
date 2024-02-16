import ReviewForm from "./ReviewForm";
import PersonReviewCard from "./PersonReviewCard";
import ReviewTable from "./ReviewTable";

export default function ProductReview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-full overflow-auto flex flex-row xl:flex-col justify-center gap-6 sm:gap-4 p-2">
        <PersonReviewCard />
        <PersonReviewCard />
      </div>
      <div className="w-full h-fit rounded-3xl bg-background flex flex-row xl:flex-col gap-6 justify-center items-start sm:p-2">
        <ReviewTable />
        <ReviewForm />
      </div>
    </div>
  );
}
