import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import CategoryApi from "@api-client/category/CategoryApi";
import { CategoryDto } from "@dto/category/CategoryDto";
import { FindAllDto } from "@dto/common/common";
import { useCallback } from "react";

export interface HooksProps {
  findAllPagination?: FindAllPaginationProps;
}

const ApiClient = CategoryApi;
interface Dto extends CategoryDto {}

export default function useCategories({ findAllPagination }: HooksProps) {
  const loadData = useCallback(() => {
    return ApiClient.FindAll(findAllPagination);
  }, [{ ...findAllPagination }]);

  return useAsyncFunctionWrapper<FindAllDto<Dto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
