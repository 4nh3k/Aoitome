import { CreateProductItemDTO } from "../ProductItems/CreateNewProductDto.type";

export interface ProductResponseDto{
  id: string;
  name: string;
  catalogId: string;
  averageRating: number;
  ratingCount: number;
  items: CreateProductItemDTO[]
}