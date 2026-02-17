export interface Paginate {
  total: number;
  pages: number;
}

export interface PaginatedResult<T> {
  data: T;
  paginate: Paginate;
}
