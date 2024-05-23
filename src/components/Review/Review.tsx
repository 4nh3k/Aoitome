import { BiLike } from "react-icons/bi";
import { MdOutlineReport } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import RatingStar from "@/components/RatingStar";
import XOutline from "@/assets/icon/x-outline.svg"
import useBookDetails from "@/hooks/useBookDetails";


interface ReviewProps {
  review: BookReview,
  isAdmin?: boolean,
  onDelete: (review: BookReview) => void;
}

const Review: React.FC<ReviewProps> = ({ review, isAdmin = false, onDelete }) => {

  const { getBookDetails } = useBookDetails(review.bookId + '');
  const { data: bookData, isLoading } = getBookDetails;

  const handleDelete = (e) => {
    console.log("Began deleting review: ");
    onDelete(review);
  }

  return (
    <div className="bg-gray-50 border-b pb-2 border-gray-200 space-y-0.5 p-3 rounded-lg flex justify-between">
      <div className="flex flex-1 items-center gap-4">
        <img src={review?.userProfileImage} className="w-20 max-h-fit flex aspect-square rounded-lg bg-gray-50 object-cover"></img>
        <div className='flex flex-col gap-2' >
          <p className="text-black text-base font-semibold"></p>
          <RatingStar initialRating={review?.ratingPoint} readonly />
          <p className="text-gray-500 text-sm">{review.creationDate}</p>
          <ShowMoreText
            lines={3}
            more="Show more"
            less="Show less"
            className="w-full text-black"
            anchorClass="text-blue-700 font-bold"
            expanded={false}
            truncatedEndingComponent={"... "}
          >
            {review.comment}
          </ShowMoreText>
          <div className="flex space-x-4">
            <div className="rounded-lg justify-center items-center gap-2 flex">
              <BiLike className="w-4 h-4 text-gray-600 relative" />
              <p className="text-gray-500 text-xs font-medium">Like (56)</p>
            </div>
            <div className="rounded-lg justify-center items-center gap-2 flex">
              <MdOutlineReport className="w-4 h-4 text-gray-600 relative" />
              <p className="text-gray-500 text-xs font-medium">Report</p>
            </div>
          </div>

        </div>
        {isAdmin &&
          <div className="flex flex-row items-center gap-4">
            <span>on the book</span>
            <div className="flex flex-row items-center gap-4">
              <img src={bookData?.imageUrl} className="w-20 max-h-fit flex aspect-square rounded-lg bg-gray-50 object-cover"></img>

              <span className="text-lg">{bookData?.title}</span>
            </div></div>}
      </div>

      {isAdmin && <button onClick={handleDelete}>
        <img src={XOutline} width={24} height={24} />
      </button>}
    </div>
  );
}

export default Review;
