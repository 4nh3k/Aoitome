export interface PaginatedResponse<T> {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  data: T[];
}
