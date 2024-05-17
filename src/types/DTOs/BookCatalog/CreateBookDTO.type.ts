interface CreateBookDTO {
  languageCode: string;
  averageRating: number | null;
  description: string | null;
  numPages: number | null;
  publicationDay: number | null;
  publicationMonth: number | null;
  publicationYear: number | null;
  isbn13?: string | null;
  imageUrl: string | null;
  ratingsCount: number | null;
  title: string | null;
  titleWithoutSeries: string | null;
  price: number | null;
  availability: number | null;
  dimensions: string | null;
  discountPercentage: number | null;
  itemWeight: number | null;
  authorName: string | null;
  genres: Genre[];
  formatId: number;
  publisherId: number;
}
