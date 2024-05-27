export interface ProductCoupon{
  id: string;
  name: string;
  condition: string;
  productId: string;
  discountValue: number;
  discountUnit: number;
  createdTime: Date;
  validFrom: Date;
  validTo: Date;
  minimumOrderValue: number;
  maximumDiscountValue: number;
  usedTime: number;
  isRedeemAllowed: boolean;
}