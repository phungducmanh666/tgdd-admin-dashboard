import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import AttributeApi from "@api-client/attribute/attribute";
import { AttributeDto } from "@dto/attribute/attribute";
import { FindAllDto } from "@dto/common/common";
import { useCallback } from "react";

const Api = AttributeApi;
interface Dto extends AttributeDto {}

export interface useAttributeGroupsProps {
  attributeGroupUid?: string;
  findAllPagination?: FindAllPaginationProps;
}

export default function useAttributes({ attributeGroupUid, findAllPagination }: useAttributeGroupsProps) {
  const loadData = useCallback(() => {
    return Api.FindAll(attributeGroupUid, findAllPagination);
  }, [attributeGroupUid, { ...findAllPagination }]);

  return useAsyncFunctionWrapper<FindAllDto<AttributeDto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
