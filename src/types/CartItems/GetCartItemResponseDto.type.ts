export interface GetCartItemResponseDTO{
  id: string;
  productItemId: string;
  count: number;
  nameProduct: string;
  description: string;
  salePrice: number;
  discountPrice: number;
  image: string;
  userCouponId?: string;
}