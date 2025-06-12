import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import ProductStatusApi from "@api-client/productStatus/ProductStatusApi";
import { FindAllDto } from "@dto/common/common";
import { ProductStatusDto } from "@dto/productStatus/ProductStatusDto";
import { useCallback } from "react";

export interface HooksProps {
  findAllPagination?: FindAllPaginationProps;
}

const ApiClient = ProductStatusApi;
interface Dto extends ProductStatusDto {}

export default function useProductStatus({ findAllPagination }: HooksProps) {
  const loadData = useCallback(() => {
    return ApiClient.FindAll(findAllPagination);
  }, [{ ...findAllPagination }]);

  return useAsyncFunctionWrapper<FindAllDto<Dto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
