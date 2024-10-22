import authApi from "@/apis/auth.api";
import { bookReviewApi } from "@/apis/bookReview.api";
import NewRating from "@/components/RatingStar/NewRating/NewRating";
import BookReview from "@/types/Models/BookCatalog/BookReview.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Rating, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditReviewForm:React.FC<BookReview> = (props) => {
  const queryClient = useQueryClient();
  const [review, setReview] = useState<BookReview>({
    userId: "",
    bookId: 0,
    username: "",
    userProfileImage: "",
    comment: "",
    ratingPoint: 0,
    creationDate: ""
  })

  useEffect(() =>{
      setReview(({
        ...review,
        userId: props.userId,
        bookId: props.bookId,
        username: props.username,
        userProfileImage: props.userProfileImage,
        comment: props.comment, 
        ratingPoint: props.ratingPoint,
        creationDate: new Date().toISOString().split("T")[0]
      }))
  }, [props]);

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(({
      ...review,
      comment: event.target.value
    }))
  };

  const handleRatingChange = (value: number) => {
    setReview(({
      ...review,
      ratingPoint: value
    }))
  };

  const editReviewMutation = useMutation({
    mutationKey: ["edit-review", review],
    mutationFn: async () => {
      console.log("Edit review mutation for ", review.userId, "for book ", review.bookId);
      await bookReviewApi.updateBookReview(review);
    },
    onSuccess: () =>{
      toast.success("Update review successfully");
      queryClient.invalidateQueries(["reviews", props.userId]);
    }
  });

  const deleteReviewMutation = useMutation({
    mutationKey: ["delete-review", review],
    mutationFn: async () => {
      console.log("Delete review mutation for ", review.userId, "for book ", review.bookId);
      await bookReviewApi.deleteBookReview(props.userId, props.bookId);
    },
    onSuccess: () =>{
      toast.success("Delete review successfully");
      queryClient.invalidateQueries(["reviews", props.userId]);
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editReviewMutation.mutate();
  };

  const handleDelete = (e) => {
    deleteReviewMutation.mutate();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-items-center">
      <Rating size={'lg'} className="p-0 m-0 h-fit border-0 items-center">
        <NewRating
          className="inline-block h-[32px] p-0 m-0 items-center"
          onChange={handleRatingChange}
          fractions={0.5}
          initialRating={review?.ratingPoint ?? 0}
          readonly={false}
          quiet={null}
          emptySymbol={<Rating.Star className="pb-0" filled={false} />}
          fullSymbol={<Rating.Star className="pb-0 text-yellow-300" />}
        ></NewRating>
      </Rating>
      <div className="w-full mb-2">
        <label htmlFor="comment">Comment:</label>
        <Textarea placeholder="Edit your comment here" className="text-sm w-full my-2 h-64" id="comment" value={review?.comment ?? ""} onChange={handleCommentChange} />
      </div>
      <div className="flex justify-end max-h-12 gap-4 ml-auto">
        <button type="submit"
          className="flex px-4 border-2 border-primary rounded-md py-2 font-semibold text-white bg-primary active:scale-95 transition duration-150 ease-in-out"
        >
          <div className="flex w-fit gap-2 items-center mx-auto">Submit review</div>
        </button>
        <button
          className="flex px-4 border-2 border-error rounded-md py-2 font-semibold text-white bg-error active:scale-95 transition duration-150 ease-in-out"
          onClick={handleDelete}
        >
          <div className="flex w-fit gap-2 items-center mx-auto">Delete review</div>
        </button>
      </div>
    </form>
  );
};

export default EditReviewForm;
