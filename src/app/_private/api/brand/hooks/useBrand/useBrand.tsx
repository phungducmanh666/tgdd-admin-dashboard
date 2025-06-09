import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import { BrandDto } from "@dto/brand/brand";
import BrandApi from "../../brand";

export default function useBrand(uid: string) {
  return useAsyncFunctionWrapper<BrandDto>({
    asyncFunction: () => {
      return BrandApi.FindByUid(uid);
    },
    runNow: true,
  });
}
