import Genre from "./Genre.type";

export default interface Book {
  id: number;
  languageCode: string;
  averageRating: number;
  description: string;
  numPages: number;
  publicationDay: number;
  publicationMonth: number;
  publicationYear: number;
  isbn13: string;
  url: string | null;
  imageUrl: string;
  ratingsCount: number;
  title: string;
  titleWithoutSeries: string;
  price: number;
  availability: number;
  dimensions: string;
  discountPercentage: number;
  itemWeight: number;
  authorName: string;
  bookGenres: Genre[];
  formatId: number;
  formatName: string;
  publisherId: number;
  publisherName: string;
}
