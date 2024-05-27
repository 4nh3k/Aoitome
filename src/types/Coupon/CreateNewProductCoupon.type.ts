export interface CreateNewProductCoupon{
  productId: string;
  discountValue: number;
  discountUnit: number;
  name: string;
  conditions: string;
  usedTime: number;
  createdTime: Date;
  validFrom: Date;
  validTo: Date;
  couponCode: string;
  minimumOrderValue: number;
  maximumDiscountValue: number;
  isRedeemAllowed: boolean;
}