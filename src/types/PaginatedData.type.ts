export interface PaginatedData<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[];
}
