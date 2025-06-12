import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import ProductLineApi from "@api-client/productLine/ProductLineApi";
import { FindAllDto } from "@dto/common/common";
import { ProductLineDto } from "@dto/productLine/ProductLineDto";
import { useCallback } from "react";

export interface HookProps {
  categoryUid?: string;
  brandUid?: string;
  findAllPagination?: FindAllPaginationProps;
}

const ApiClient = ProductLineApi;
interface Dto extends ProductLineDto {}

export default function useProductLines({ categoryUid, brandUid, findAllPagination }: HookProps) {
  const loadData = useCallback(() => {
    return ApiClient.FindAll(categoryUid, brandUid, findAllPagination);
  }, [categoryUid, brandUid, { ...findAllPagination }]);

  return useAsyncFunctionWrapper<FindAllDto<Dto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
