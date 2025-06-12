import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import AttributeGroupApi from "@api-client/attributeGroup/AttributeGroupApi";
import { AttributeGroupDto } from "@dto/attributeGroup/AttributeGroupDto";

const Api = AttributeGroupApi;
interface Dto extends AttributeGroupDto {}

export default function useAttributeGroup(uid: string) {
  return useAsyncFunctionWrapper<Dto>({
    asyncFunction: () => {
      return Api.FindByUid(uid);
    },
    runNow: true,
  });
}
