import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import { CategoryDto } from "@dto/category/category";
import { FindAllDto } from "@dto/common/common";
import { useCallback } from "react";
import CategoryBrandMapApi from "../categoryBrandMap";

export interface useCategoryBrandsProps {
  categoryUid: string;
  isBelong: boolean;
  paginationParams?: FindAllPaginationProps;
}

export default function useCategoryBrands({ categoryUid, isBelong, paginationParams }: useCategoryBrandsProps) {
  const loadData = useCallback(() => {
    return CategoryBrandMapApi.FindAllBrands(categoryUid, isBelong, paginationParams);
  }, [categoryUid, { ...paginationParams }]);

  return useAsyncFunctionWrapper<FindAllDto<CategoryDto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
