import { OrderDirection } from "@dto/common/common";

export interface FindAllPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  orderField: string;
  orderDirection: OrderDirection;
}
