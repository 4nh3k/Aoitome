import { BiLike } from "react-icons/bi";
import { MdOutlineReport } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import RatingStar from "../RatingStar";

export function Review() {
  return (
    <div className="border-b pb-2 border-gray-200 space-y-0.5">
      <p className="text-black text-base font-semibold">Alice Pham</p>
      <RatingStar initialRating={5} readonly />
      <p className="text-gray-500 text-sm">28/2/2024</p>
      <ShowMoreText
        lines={3}
        more="Show more"
        less="Show less"
        className="w-full text-black"
        anchorClass="text-blue-700 font-bold"
        expanded={false}
        truncatedEndingComponent={"... "}
      >
        Considering the comprehensive content and effective practice materials,
        the book offers excellent value for money, especially for self-study
        purposes.
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
  );
}
