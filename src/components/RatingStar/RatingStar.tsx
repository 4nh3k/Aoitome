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
    <Rating className="p-0 m-0 h-fit border-0 items-center">
      <NewRating className="inline-block h-[20px] p-0 m-0 items-center"
        onChange={props.onChange}
        fractions={props.fractions}
        initialRating={props.initialRating}
        readonly={props.readonly}
        quiet={props.quiet}
        emptySymbol={<Rating.Star className="pb-0" filled={false} />}
        fullSymbol={<Rating.Star className="pb-0 text-yellow-300" />}
      />
      <a
        href="#"
        className="ml-2 text-sm font-medium text-gray-900  hover:no-underline dark:text-white"
      >
        73 reviews
      </a>
    </Rating>
  );
}
