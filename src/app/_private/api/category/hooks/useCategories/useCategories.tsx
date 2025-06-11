import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import { CategoryDto } from "@dto/category/category";
import { FindAllDto } from "@dto/common/common";
import { useCallback } from "react";
import CategryApi from "../../category";

export interface useCategoriesProps {
  findAllPagination?: FindAllPaginationProps;
}

export default function useCategories({ findAllPagination }: useCategoriesProps) {
  const loadData = useCallback(() => {
    return CategryApi.FindAll(findAllPagination);
  }, [{ ...findAllPagination }]);

  return useAsyncFunctionWrapper<FindAllDto<CategoryDto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
