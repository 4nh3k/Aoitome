import { GetCartItemResponseDTO } from "../CartItems/GetCartItemResponseDto.type";

export interface GetCartResponseDTO{
  userId?: string;
  items?: GetCartItemResponseDTO[],
  totalPrice?: number;
}