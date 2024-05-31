import { ApiResponse } from "@/types/ApiResponse.type";
import { ADD_COUPON_URL, DELETE_COUPON_URL, GET_ALL_COUPON_URL, GET_COUPON_BY_ID_URL, PRODUCT_COUPON_PREFIX, UPDATE_COUPON_URL } from "../constants/endpoint";
import { CreateNewProductCoupon } from "../types/Coupon/CreateNewProductCoupon.type";
import { UpdateProductCoupon } from "../types/Coupon/UpdateProductCoupon.type";
import http from "../utils/http";
import { ProductCoupon } from "@/types/Coupon/ProductCoupon.type";

export const productCouponApi = {
  getAllProductCoupons() {
    return http.get<ApiResponse<ProductCoupon[]>>(`${PRODUCT_COUPON_PREFIX}${GET_ALL_COUPON_URL}`);
  },
  getProductCouponById(id: string){
    return http.get<ApiResponse<ProductCoupon>>(`${PRODUCT_COUPON_PREFIX}${GET_COUPON_BY_ID_URL}/${id}`);
  },
  addProductCoupon(body: CreateNewProductCoupon){
    return http.post<ApiResponse<ProductCoupon>>(`${PRODUCT_COUPON_PREFIX}${ADD_COUPON_URL}`, body);
  },
  updateProductCoupon(body: UpdateProductCoupon){
    return http.post<ApiResponse<string>>(`${PRODUCT_COUPON_PREFIX}${UPDATE_COUPON_URL}`, body);
  },
  deleteProductCoupon(couponId: string){
    return http.post<ApiResponse<string>>(`${PRODUCT_COUPON_PREFIX}${DELETE_COUPON_URL}/${couponId}`);
  }
};

export default productCouponApi;
