interface BookReview {
  userId: string;
  bookId: number;
  username?: string | null;
  userProfileImage?: string | null;
  comment?: string | null;
  ratingPoint?: number | null;
  creationDate?: string | null; // Assuming date is stored as a string (ISO format) in TypeScript
}
