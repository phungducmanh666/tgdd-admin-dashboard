import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import VariantAttributeApi from "@api-client/variantAttribute/VariantAttributeApi";
import { VariantAttributeDto } from "@dto/variantAttribute/VariantAttributeDto";

const ApiClient = VariantAttributeApi;
interface Dto extends VariantAttributeDto {}

export default function useVariantAttribute(uid: string) {
  return useAsyncFunctionWrapper<Dto>({
    asyncFunction: () => {
      return ApiClient.FindByUid(uid);
    },
    runNow: true,
  });
}
