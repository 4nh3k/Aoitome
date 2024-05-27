export interface CreateCartItemDTO {
  productItemId: string;
  count: number;
  userCouponId?: string;
}