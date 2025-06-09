interface Pagination {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface FindAllDto<T> {
  data: T[];
  pagination: Pagination;
}

export type OrderDirection = "ASC" | "DESC";
