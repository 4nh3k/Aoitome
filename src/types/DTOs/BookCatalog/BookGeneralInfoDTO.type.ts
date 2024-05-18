interface BookGeneralInfoDTO {
  id: number;
  averageRating?: number;
  description?: string;
  numPages?: number;
  publicationDay?: number;
  publicationMonth?: number;
  publicationYear?: number;
  imageUrl?: string;
  ratingsCount?: number;
  title?: string;
  titleWithoutSeries?: string;
  price?: number;
  availability?: number;
  discountPercentage?: number;
  authorName?: string;
}
