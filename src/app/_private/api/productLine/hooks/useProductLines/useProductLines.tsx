import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import ProductLineApi from "@api-client/productLine/productLine";
import { FindAllDto } from "@dto/common/common";
import { ProductLineDto } from "@dto/productLine/productLine";
import { useCallback } from "react";

export interface useCategoriesProps {
  categoryUid?: string;
  brandUid?: string;
  findAllPagination?: FindAllPaginationProps;
}

export default function useProductLines({ categoryUid, brandUid, findAllPagination }: useCategoriesProps) {
  const loadData = useCallback(() => {
    return ProductLineApi.FindAll(categoryUid, brandUid, findAllPagination);
  }, [categoryUid, brandUid, { ...findAllPagination }]);

  return useAsyncFunctionWrapper<FindAllDto<ProductLineDto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
