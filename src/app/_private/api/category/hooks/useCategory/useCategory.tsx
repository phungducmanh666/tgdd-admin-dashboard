import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import CategoryApi from "@api-client/category/CategoryApi";
import { CategoryDto } from "@dto/category/CategoryDto";

const ApiClient = CategoryApi;
interface Dto extends CategoryDto {}

export default function useCategory(uid: string) {
  return useAsyncFunctionWrapper<CategoryDto>({
    asyncFunction: () => {
      return ApiClient.FindByUid(uid);
    },
    runNow: true,
  });
}
