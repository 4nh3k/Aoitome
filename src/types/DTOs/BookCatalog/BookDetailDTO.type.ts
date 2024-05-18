import Genre from "../../Models/BookCatalog/Genre.type";

export interface BookDetailDTO {
  id: number;
  languageCode?: string | null;
  averageRating?: number;
  description?: string;
  numPages?: number | null;
  publicationDay?: number | null;
  publicationMonth?: number | null;
  publicationYear?: number | null;
  isbn13?: string;
  url?: string;
  imageUrl?: string;
  ratingsCount?: number | null;
  title?: string;
  titleWithoutSeries?: string;
  price?: number | null;
  availability?: number | null;
  dimensions?: string;
  discountPercentage?: number | null;
  itemWeight?: number | null;
  authorName?: string;
  bookGenres: Genre[]; // Assuming Genre is defined as a type/interface
  formatId?: number | null;
  formatName?: string | null;
  publisherId: number;
  publisherName?: string;
}
