import { ProductItemResponseDTO } from "../ProductItems/ProductItemResponseDto.type";

export interface ProductResponseDto {
  id: string;
  name: string;
  catalogId: string;
  averageRating: number;
  ratingCount: number;
  items: ProductItemResponseDTO[];
}
