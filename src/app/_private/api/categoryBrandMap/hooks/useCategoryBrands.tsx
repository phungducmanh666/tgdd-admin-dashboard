import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import { CategoryDto } from "@dto/category/category";
import { FindAllDto, OrderDirection } from "@dto/common/common";
import { useCallback } from "react";
import CategoryBrandMapApi from "../categoryBrandMap";

interface HookProps {
  categoryUid: string;
  isBelong: boolean;
  currentPage: number;
  itemsPerPage: number;
  orderField: string;
  orderDirection: OrderDirection;
}

export default function useCategoryBrands({ categoryUid, currentPage, isBelong, itemsPerPage, orderField, orderDirection }: HookProps) {
  const loadData = useCallback(() => {
    return CategoryBrandMapApi.FindAllBrands(categoryUid, { isBelong, currentPage, itemsPerPage, orderField, orderDirection });
  }, [currentPage, itemsPerPage, orderField, orderDirection]);

  return useAsyncFunctionWrapper<FindAllDto<CategoryDto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
