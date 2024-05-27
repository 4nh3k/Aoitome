export interface CatalogCoupon{
  id: string;
  catalogId: string;
  discountValue: number;
  discountUnit: number;
  validFrom: number;
  validTo: number;
  minimumOrderValue: number;
  maximumDiscountValue: number;
  isRedeemAllowed: boolean;
  
}