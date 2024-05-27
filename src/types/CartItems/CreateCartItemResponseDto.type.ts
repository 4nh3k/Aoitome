export interface CreateCartItemResponseDTO{
  id: string;
  productItemId: string;
  count: number;
  userCouponId?: number;
}