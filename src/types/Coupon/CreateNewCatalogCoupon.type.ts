export interface CreateNewCatalogCouponDTO{
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