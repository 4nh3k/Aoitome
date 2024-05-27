import { CART_SUFFIX, USER_CART_PREFIX } from "../constants/endpoint";
import { CreateCartItemDTO } from "../types/CartItems/CreateCartItemDto.type";
import { GetCartResponseDTO } from "../types/Carts/GetCartResponseDto.type";
import http from "../utils/http";

export const cartApi = {
  getCartItems(id: string) {
    return http.get<GetCartResponseDTO>(`${USER_CART_PREFIX}/${id}/${CART_SUFFIX}`);
  },
  upsertCartItems(id: string, body: CreateCartItemDTO){
    return http.post<Response>(`${USER_CART_PREFIX}/${id}/${CART_SUFFIX}`, body);
  },
  deleteCartItems(id: string, productItemId: string){
    return http.delete<Response>(`${USER_CART_PREFIX}/${id}/${CART_SUFFIX}/${productItemId}`);
  }
};

export default cartApi;
