import { FindAllPaginationProps } from "../../data/props/ApiProps";

export interface TablePaginationState extends FindAllPaginationProps {}

export type TablePaginationAction = { type: "CHANGE"; payload: TablePaginationState } | { type: "RELOAD" };

export const initialTablePaginationState: TablePaginationState = {
  currentPage: 1,
  itemsPerPage: 10,
  orderField: "uid",
  orderDirection: "ASC",
};

export const tablePaginationReducer = (preState: TablePaginationState, action: TablePaginationAction): TablePaginationState => {
  switch (action.type) {
    case "CHANGE": {
      return action.payload;
    }
    case "RELOAD": {
      return { ...preState };
    }
    default:
      return preState;
  }
};
