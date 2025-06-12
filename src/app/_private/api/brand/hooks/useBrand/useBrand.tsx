import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import { BrandDto } from "@dto/brand/BrandDto";
import BrandApi from "../../BrandApi";

const ApiClient = BrandApi;
interface Dto extends BrandDto {}

export default function useBrand(uid: string) {
  return useAsyncFunctionWrapper<Dto>({
    asyncFunction: () => {
      return ApiClient.FindByUid(uid);
    },
    runNow: true,
  });
}
