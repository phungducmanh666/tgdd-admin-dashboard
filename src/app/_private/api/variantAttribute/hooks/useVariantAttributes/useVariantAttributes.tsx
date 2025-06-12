import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import VariantAttributeApi from "@api-client/variantAttribute/VariantAttributeApi";
import { FindAllDto } from "@dto/common/common";
import { VariantAttributeDto } from "@dto/variantAttribute/VariantAttributeDto";
import { useCallback } from "react";

export interface HooksProps {
  findAllPagination?: FindAllPaginationProps;
}

const ApiClient = VariantAttributeApi;
interface Dto extends VariantAttributeDto {}

export default function useVariantAttributes({ findAllPagination }: HooksProps) {
  const loadData = useCallback(() => {
    return ApiClient.FindAll(findAllPagination);
  }, [{ ...findAllPagination }]);

  return useAsyncFunctionWrapper<FindAllDto<Dto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
