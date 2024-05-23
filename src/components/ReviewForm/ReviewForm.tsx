import { Button, Textarea } from "flowbite-react";
import { useState } from "react";
import RatingStar from "../RatingStar";

interface ReviewFormProps {
  bookId: string;
}

export function ReviewForm({ bookId }: ReviewFormProps) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="comment">Comment:</label>
        <Textarea id="comment" value={comment} onChange={handleCommentChange} />
      </div>
      <div>
        <label htmlFor="rating">Rating:</label>
        <RatingStar initialRating={rating} onChange={handleRatingChange} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
