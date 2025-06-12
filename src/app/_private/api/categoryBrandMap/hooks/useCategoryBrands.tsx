import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import { BrandDto } from "@dto/brand/BrandDto";
import { FindAllDto } from "@dto/common/common";
import { useCallback } from "react";
import CategoryBrandMapApi from "../CategoryBrandMapApi";

export interface useCategoryBrandsProps {
  categoryUid: string;
  isBelong: boolean;
  paginationParams?: FindAllPaginationProps;
}

const ApiClient = CategoryBrandMapApi;
interface Dto extends BrandDto {}

export default function useCategoryBrands({ categoryUid, isBelong, paginationParams }: useCategoryBrandsProps) {
  const loadData = useCallback(() => {
    return ApiClient.FindAllBrands(categoryUid, isBelong, paginationParams);
  }, [categoryUid, { ...paginationParams }]);

  return useAsyncFunctionWrapper<FindAllDto<Dto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
