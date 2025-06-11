import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import AttributeGroupApi from "@api-client/attributeGroup/attributeGroup";
import { AttributeGroupDto } from "@dto/attributeGroup/attributeGroup";

const Api = AttributeGroupApi;

export default function useAttributeGroup(uid: string) {
  return useAsyncFunctionWrapper<AttributeGroupDto>({
    asyncFunction: () => {
      return Api.FindByUid(uid);
    },
    runNow: true,
  });
}
