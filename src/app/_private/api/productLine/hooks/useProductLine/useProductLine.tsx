import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import ProductLineApi from "@api-client/productLine/ProductLineApi";
import { ProductLineDto } from "@dto/productLine/ProductLineDto";

const ApiClient = ProductLineApi;
interface Dto extends ProductLineDto {}

export default function useBrand(uid: string) {
  return useAsyncFunctionWrapper<Dto>({
    asyncFunction: () => {
      return ApiClient.FindByUid(uid);
    },
    runNow: true,
  });
}
