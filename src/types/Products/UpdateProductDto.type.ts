import { CreateProductItemDTO } from "../ProductItems/CreateNewProductDto.type";
import { UpdateProductItemDTO } from "../ProductItems/UpdateProductItemDto.type";

export interface UpdateProductDto{
  id: string;
  name: string;
  catalogId: string;
  averageRating: number;
  ratingCount: number;
  items: CreateProductItemDTO[]
}