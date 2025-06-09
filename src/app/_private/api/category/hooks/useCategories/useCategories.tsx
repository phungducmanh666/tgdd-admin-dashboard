import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import { CategoryDto } from "@dto/category/category";
import { FindAllDto, OrderDirection } from "@dto/common/common";
import { useCallback } from "react";
import CategryApi from "../../category";

interface useCategoriesProps {
  currentPage: number;
  itemsPerPage: number;
  orderField: string;
  orderDirection: OrderDirection;
}

export default function useCategories({ currentPage, itemsPerPage, orderField, orderDirection }: useCategoriesProps) {
  const loadData = useCallback(() => {
    return CategryApi.FindAll({ currentPage, itemsPerPage, orderField, orderDirection });
  }, [currentPage, itemsPerPage, orderField, orderDirection]);

  return useAsyncFunctionWrapper<FindAllDto<CategoryDto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
