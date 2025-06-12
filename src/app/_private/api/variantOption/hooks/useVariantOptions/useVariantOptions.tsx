import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import VariantOptionApi from "@api-client/variantOption/VariantOptionApi";
import { FindAllDto } from "@dto/common/common";
import { VariantOptionDto } from "@dto/variantOption/VariantOptionDto";
import { useCallback } from "react";

const Api = VariantOptionApi;
interface Dto extends VariantOptionDto {}

export interface HookProps {
  variantAttributeUid?: string;
  findAllPagination?: FindAllPaginationProps;
}

export default function useVariantOptions({ variantAttributeUid, findAllPagination }: HookProps) {
  const loadData = useCallback(() => {
    return Api.FindAll(variantAttributeUid, findAllPagination);
  }, [variantAttributeUid, { ...findAllPagination }]);

  return useAsyncFunctionWrapper<FindAllDto<Dto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
