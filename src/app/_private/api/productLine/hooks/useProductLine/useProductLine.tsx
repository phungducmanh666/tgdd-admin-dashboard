import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import ProductLineApi from "@api-client/productLine/productLine";
import { ProductLineDto } from "@dto/productLine/productLine";

export default function useBrand(uid: string) {
  return useAsyncFunctionWrapper<ProductLineDto>({
    asyncFunction: () => {
      return ProductLineApi.FindByUid(uid);
    },
    runNow: true,
  });
}
