import { FindAllPaginationProps } from "@/app/_private/data/props/ApiProps";
import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import AttributeGroupApi from "@api-client/attributeGroup/attributeGroup";
import { AttributeGroupDto } from "@dto/attributeGroup/attributeGroup";
import { FindAllDto } from "@dto/common/common";
import { useCallback } from "react";

const Api = AttributeGroupApi;
interface Dto extends AttributeGroupDto {}

export interface useAttributeGroupsProps {
  categoryUid?: string;
  findAllPagination?: FindAllPaginationProps;
}

export default function useAttributeGroups({ categoryUid, findAllPagination }: useAttributeGroupsProps) {
  const loadData = useCallback(() => {
    return Api.FindAll(categoryUid, findAllPagination);
  }, [categoryUid, { ...findAllPagination }]);

  return useAsyncFunctionWrapper<FindAllDto<AttributeGroupDto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
