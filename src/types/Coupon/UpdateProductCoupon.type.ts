export interface UpdateProductCoupon{
  id: string;
  name: string;
  conditions: string;
  productId: string;
  discountValue: number;
  discountUnit: number;
  createdTime: Date;
  validFrom: Date;
  validTo: Date;
  couponCode: string;
  minimumOrderValue: number;
  maximumDiscountValue: number;
  isRedeemAllowed: boolean;
}