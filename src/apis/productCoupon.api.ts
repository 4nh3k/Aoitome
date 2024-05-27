import { ADD_COUPON_URL, DELETE_COUPON_URL, GET_ALL_COUPON_URL, GET_COUPON_BY_ID_URL, PRODUCT_COUPON_PREFIX, UPDATE_COUPON_URL } from "../constants/endpoint";
import { CreateNewProductCoupon } from "../types/Coupon/CreateNewProductCoupon.type";
import { UpdateProductCoupon } from "../types/Coupon/UpdateProductCoupon.type";
import http from "../utils/http";

export const productCouponApi = {
  getAllProductCoupons() {
    return http.get<Response>(`${PRODUCT_COUPON_PREFIX}/${GET_ALL_COUPON_URL}`);
  },
  getProductCouponById(id: string){
    return http.get<Response>(`${PRODUCT_COUPON_PREFIX}/${GET_COUPON_BY_ID_URL}${id}`);
  },
  addProductCoupon(body: CreateNewProductCoupon){
    return http.post<Response>(`${PRODUCT_COUPON_PREFIX}/${ADD_COUPON_URL}`, body);
  },
  updateProductCoupon(body: UpdateProductCoupon){
    return http.post<Response>(`${PRODUCT_COUPON_PREFIX}/${UPDATE_COUPON_URL}`, body);
  },
  deleteProductCoupon(couponId: string){
    return http.post<Response>(`${PRODUCT_COUPON_PREFIX}/${DELETE_COUPON_URL}/${couponId}`);
  }
};

export default productCouponApi;
