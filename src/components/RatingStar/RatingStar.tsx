import { Rating } from "flowbite-react";
import NewRating from "./NewRating/NewRating";

interface RatingStarProps {
  onChange?: (value: number) => void;
  fractions?: number;
  initialRating?: number;
  readonly?: boolean;
  quiet?: boolean; // toggle hover animation
}

export function RatingStar(props: RatingStarProps) {
  return (
    <Rating>
      <NewRating
        onChange={props.onChange}
        fractions={props.fractions}
        initialRating={props.initialRating}
        readonly={props.readonly}
        quiet={props.quiet}
        emptySymbol={<Rating.Star className="pb-0" filled={false} />}
        fullSymbol={<Rating.Star className="pb-0 text-yellow-300" />}
      />
    </Rating>
  );
}
