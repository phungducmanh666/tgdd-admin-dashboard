import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import BrandApi from "@api-client/brand/BrandApi";
import { BrandDto } from "@dto/brand/BrandDto";
import { FindAllDto } from "@dto/common/common";
import { useCallback } from "react";

export interface HooksProps {
  findAllPagination?: FindAllPaginationProps;
}

const ApiClient = BrandApi;
interface Dto extends BrandDto {}

export default function useBrands({ findAllPagination }: HooksProps) {
  const loadData = useCallback(() => {
    return ApiClient.FindAll(findAllPagination);
  }, [{ ...findAllPagination }]);

  return useAsyncFunctionWrapper<FindAllDto<Dto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
