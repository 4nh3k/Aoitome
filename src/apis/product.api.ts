import { ApiResponse } from "@/types/ApiResponse.type";
import { ProductResponseDto } from "@/types/Products/ProductResponseDto.type";
import {
  ADD_PRODUCT_URL,
  DELETE_PRODUCT_URL,
  GET_PRODUCT_BY_ID_URL,
  PRODUCT_PREFIX,
  UPDATE_PRODUCT_URL,
} from "../constants/endpoint";
import { CreateNewProductDto } from "../types/Products/CreateNewProductDto.type";
import { UpdateProductDto } from "../types/Products/UpdateProductDto.type";
import http from "../utils/http";
import { AllDTO } from "@/types/Orders/AllOrdersDTO.type";

export const productApi = {
  getAllProducts(pageIndex: number, pageSize: number) {
    return http.get<ApiResponse<ProductResponseDto[]>>(
      `${PRODUCT_PREFIX}?pageNumber=${pageIndex}&pageNumber=${pageSize}`
    );
  },
  searchProduct(pageIndex: number, pageSize: number, searchTerm: any) {
    const filter = searchTerm === "" ? "" : {
      filters:
        [{
          field: "Name",
          operator: "contains",
          value: searchTerm
        }], 
        logic: "and"
    }
    const filterString = JSON.stringify(filter);
    console.log("The filter string is")
    console.log(filterString)

    return http.get<ApiResponse<AllDTO<ProductResponseDto>>>(
      `${PRODUCT_PREFIX}?pageNumber=${pageIndex}&pageSize=${pageSize}&filter=${filterString}`
    )
  },
  getProductById(id: string) {
    return http.get<ProductResponseDto>(
      `${PRODUCT_PREFIX}${GET_PRODUCT_BY_ID_URL}/${id}`
    );
  },
  addProduct(body: CreateNewProductDto) {
    return http.post<Response>(`${PRODUCT_PREFIX}${ADD_PRODUCT_URL}`, body);
  },
  updateProduct(body: CreateNewProductDto){
    return http.put<Response>(`${PRODUCT_PREFIX}${UPDATE_PRODUCT_URL}`, body);
  },
  deleteProduct(id: string){
    return http.post<Response>(`${PRODUCT_PREFIX}${DELETE_PRODUCT_URL}/${id}`)
  },
  updateProductCoupon(body: UpdateProductDto) {
    return http.post<Response>(`${PRODUCT_PREFIX}${UPDATE_PRODUCT_URL}`, body);
  },
  deleteProductCoupon(couponId: string) {
    return http.post<Response>(
      `${PRODUCT_PREFIX}${DELETE_PRODUCT_URL}/${couponId}`
    );
  },
};

export default productApi;
