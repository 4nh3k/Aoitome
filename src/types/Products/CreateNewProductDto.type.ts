import { CreateProductItemDTO } from "../ProductItems/CreateNewProductDto.type";

export interface CreateNewProductDto{
  name: string;
  catalogId: string;
  averageRating: number;
  ratingCount: number;
  items: CreateProductItemDTO[]
}