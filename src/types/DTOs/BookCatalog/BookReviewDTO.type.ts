export default interface BookReviewDTO {
  userId: string;
  bookId: number;
  username?: string | null;
  userProfileImage?: string | null;
  comment?: string | null;
  ratingPoint?: number | null;
}
