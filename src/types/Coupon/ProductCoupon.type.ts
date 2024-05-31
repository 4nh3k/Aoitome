import { ProductResponseDto } from "../Products/ProductResponseDto.type";

export interface ProductCoupon{
  id: string;
  name: string;
  conditions: string;
  productId: string;
  discountValue: number;
  discountUnit: string;
  couponCode: string;
  createdTime: Date;
  validFrom: Date;
  validTo: Date;
  minimumOrderValue: number;
  maximumDiscountValue: number;
  usedTime: number;
  isRedeemAllowed: boolean;
  product: ProductResponseDto
}