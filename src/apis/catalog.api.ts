import { CATALOG_PREFIX } from "../constants/endpoint";
import { CreateCatalogDTO } from "../types/Categories/CreateCatalogDTO.type";
import { UpdateCatalogDTO } from "../types/Categories/UpdateCatalogDTO.type";
import http from "../utils/http";

export const catalogApi = {
  getCategories() {
    return http.get<Response>(`${CATALOG_PREFIX}`);
  },
  createCategory(body: CreateCatalogDTO){
    return http.post<Response>(`${CATALOG_PREFIX}`, body);
  },
  updateCategory(body: UpdateCatalogDTO){
    return http.put<Response>(`${CATALOG_PREFIX}`, body);
  },
  getCatalogById(id: string){
    return http.get<Response>(`${CATALOG_PREFIX}/${id}`)
  },
  deleteCatalogById(id: string){
    return http.delete<Response>(`${CATALOG_PREFIX}/${id}`)
  }
};

export default catalogApi;
