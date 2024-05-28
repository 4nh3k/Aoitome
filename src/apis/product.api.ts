import { ADD_PRODUCT_URL, DELETE_PRODUCT_URL, GET_ALL_PRODUCT_URL, GET_PRODUCT_BY_ID_URL, PRODUCT_PREFIX, UPDATE_PRODUCT_URL } from "../constants/endpoint";
import { CreateNewProductDto } from "../types/Products/CreateNewProductDto.type";
import { UpdateProductDto } from "../types/Products/UpdateProductDto.type";
import http from "../utils/http";

export const productApi = {
  getAllProducts(pageIndex: number, pageSize: number) {
    return http.get<Response>(`${PRODUCT_PREFIX}${GET_ALL_PRODUCT_URL}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  },
  getProductCouponById(id: string){
    return http.get<Response>(`${PRODUCT_PREFIX}${GET_PRODUCT_BY_ID_URL}${id}`);
  },
  addProductPRODUCT(body: CreateNewProductDto){
    return http.post<Response>(`${PRODUCT_PREFIX}${ADD_PRODUCT_URL}`, body);
  },
  updateProductCoupon(body: UpdateProductDto){
    return http.post<Response>(`${PRODUCT_PREFIX}${UPDATE_PRODUCT_URL}`, body);
  },
  deleteProductCoupon(couponId: string){
    return http.post<Response>(`${PRODUCT_PREFIX}${DELETE_PRODUCT_URL}/${couponId}`);
  }
};

export default productApi;
