import React from 'react'
import RatingStar from '../RatingStar'
import { PiThumbsUp, PiWarningCircleLight } from 'react-icons/pi'

interface CommentProps{
  bookId: number,
  username: string,
  commentDate: string,
  rating: number,
  commentDescr: string
}

const Comment:React.FC<CommentProps> = (props) => {
  return (
    <div id="comment" className="flex items-start gap-4">
    <div id="user-info" className="flex flex-col w-[200px]">
      <span>{props.username}</span>
      <span>{props.commentDate}</span>
    </div>
    <div id="comment-detail" className="flex flex-col flex-1">
      <div id="rating-point">
        <RatingStar readonly={true} initialRating={props.rating} productId={props.bookId}/>
      </div>
      <div id="comment-description">{props.commentDescr}</div>
      <div
        id="rating-action"
        className="flex flex-row items-center gap-2"
      >
        <div
          id="like"
          className="flex flex-row gap-2 items-center"
        >
          <PiThumbsUp />
          Like (0)
        </div>
        <div
          id="report"
          className="flex flex-row items-center gap-2"
        >
          <PiWarningCircleLight />
          Report
        </div>
      </div>
    </div>
  </div>
  )
}

export default Comment