import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import BrandApi from "@api-client/brand/brand";
import { BrandDto } from "@dto/brand/brand";
import { FindAllDto } from "@dto/common/common";
import { useCallback } from "react";

export interface useCategoriesProps {
  findAllPagination?: FindAllPaginationProps;
}

export default function useBrands({ findAllPagination }: useCategoriesProps) {
  const loadData = useCallback(() => {
    return BrandApi.FindAll(findAllPagination);
  }, [{ ...findAllPagination }]);

  return useAsyncFunctionWrapper<FindAllDto<BrandDto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
