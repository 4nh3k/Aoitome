export interface UserCoupon{
  id: string;
  userId: string;
  productCouponId: string;
  remainingUsage: number;
  status: number;
}