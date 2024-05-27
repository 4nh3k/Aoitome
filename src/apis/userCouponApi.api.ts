import { USER_ALL_COUPONS_URL, USER_COUPON_API } from "../constants/endpoint";
import http from "../utils/http";

export const userCouponApi = {
  getAllUserCoupon(status: number) {
    return http.get<Response>(`${USER_COUPON_API}${USER_ALL_COUPONS_URL}?status=${status}`);
  },
  getCoupon(code: string, query: string){
    return http.get<Response>(`${USER_COUPON_API}?code=${code}&query=${query}`);
  },
  tryApplyCoupon(userCouponId: string, productItemId: string){
    return http.get<Response>(`${USER_COUPON_API}?userCouponId=${userCouponId}&productItemId=${productItemId}`)
  }
};

export default userCouponApi;
