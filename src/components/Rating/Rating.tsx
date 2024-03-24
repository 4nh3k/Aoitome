export function Rating(props) {
  return (
    <Rating
      emptySymbol="fa fa-star-o"
      fullSymbol="fa fa-star"
      initialRating={props.initialRating}
      readonly={props.readonly}
      fractions={2}
      start={0}
      stop={5}
      step={1}
      emptyColor="#ccc"
      fullColor="#f00"
      onChange={props.onChange}
    />
  );
}
