import { Rating } from "flowbite-react";
import NewRating from "./NewRating/NewRating";
import { useQuery } from "@tanstack/react-query";
import { bookReviewApi } from "@/apis/bookReview.api";
import { Fade } from "react-awesome-reveal";

interface RatingStarProps {
  onChange?: (value: number) => void;
  fractions?: number;
  initialRating?: number;
  readonly?: boolean;
  quiet?: boolean;
  productId?: number; // toggle hover animation
}

export function RatingStar(props: RatingStarProps) {
  const { data: reviewData, isLoading: isLoadingReviews } = useQuery({
    queryKey: ["review-rating", props.productId],
    queryFn: async () => {
      if (!props.productId) {
        return;
      }
      const data = await bookReviewApi.getBookReviewByBook(
        props.productId,
        0,
        500
      );
      console.log("data", data);

      return data.data;
    },
  });

  return (
    <Rating className="p-0 m-0 h-fit border-0 items-center">
      <NewRating
        className="inline-block h-[20px] p-0 m-0 items-center"
        onChange={props.onChange}
        fractions={props.fractions}
        initialRating={props.initialRating}
        readonly={props.readonly}
        quiet={props.quiet}
        emptySymbol={<Rating.Star className="pb-0" filled={false} />}
        fullSymbol={<Rating.Star className="pb-0 text-yellow-300" />}
      />
      {!isLoadingReviews && (
        <Fade triggerOnce={true}>
          {" "}
          <a
            href="#"
            className="ml-2 text-sm font-medium text-gray-900  hover:no-underline dark:text-white"
          >
            {reviewData?.totalItems !== null && reviewData?.totalItems !== undefined ? reviewData.totalItems : 53} reviews
          </a>
        </Fade>
      )}
    </Rating>
  );
}
